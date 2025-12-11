import { Command } from 'commander';
import chalk from 'chalk';
import { getConfig, AVAILABLE_MODELS, Config } from './config';
import { chatCommand } from './commands/chat';
import { interactiveCommand } from './commands/interactive';
import { analyzeCommand } from './commands/analyze';
import { tokensCommand } from './commands/tokens';
import { DeepSeekAPI, TokenUsage } from './api';
import { helpText } from './help';
import ora from 'ora';
import { setupCommand } from './commands/setup';
import { globSync } from 'glob';

export class CLI {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupCLI();
  }

  private setupCLI(): void {
    this.program
      .name('deepseek')
      .description('AI-powered coding assistant (MVP) with local Ollama support')
      .version('1.1.0')
      .option('-k, --api-key <key>', 'DeepSeek API key (for cloud mode)')
      .option('-m, --model <model>', `Model to use (available: ${Object.values(AVAILABLE_MODELS).join(', ')})`, AVAILABLE_MODELS.CHAT)
      .option('-l, --local', 'Force local mode using Ollama')
      .option('--ollama-host <host>', 'Ollama host URL (default: http://localhost:11434)')
      .option('-t, --temperature <temp>', 'Temperature for response creativity (0.0-1.0)', '0.1')
      .option('--max-tokens <tokens>', 'Maximum tokens in response', '4096')
      .option('-s, --stream', 'Enable streaming responses', false)
      .option('-r, --show-reasoning', 'Show reasoning (only for deepseek-reasoner model)', false)
      .option('-i, --include <file>', 'Include file on the request')
      .option('-a, --include-all <filePattern>', 'Include files on the request. eg.: src/*')
      .helpOption('-h, --help', 'Display help information')
      .addHelpCommand(false)
      .on('--help', () => {
        console.log(helpText);
      });

    // Chat command for single prompts
    this.program
      .command('chat <prompt>')
      .alias('ask')
      .description('Send a single prompt')
      .action(async (prompt, options) => {
        const config = this.buildConfig(this.program.opts());
        await chatCommand(prompt, config);
      });

    // Analyze command for code files
    this.program
      .command('analyze <file>')
      .alias('review')
      .description('Analyze a code file for quality, bugs, and improvements')
      .action(async (file, options) => {
        const config = this.buildConfig(this.program.opts());
        await analyzeCommand(file, config);
      });

    // Reason command for complex problems
    this.program
      .command('reason <prompt>')
      .alias('solve')
      .description('Solve complex problems with detailed reasoning (uses deepseek-reasoner model)')
      .action(async (prompt, options) => {
        const config = this.buildConfig({
          ...this.program.opts(),
          model: AVAILABLE_MODELS.REASONER,
          showReasoning: true
        });
        await this.reasonCommand(prompt, config);
      });

    // Tokens command for counting tokens and estimating costs
    this.program
      .command('tokens <input>')
      .alias('count')
      .description('Count tokens and estimate costs for text or a file')
      .option('-f, --file', 'Treat input as a file path')
      .option('-m, --model <model>', 'Model to use for cost estimation (deepseek-chat or deepseek-reasoner)')
      .option('-t, --time <period>', 'Time period for pricing (standard or discount)')
      .option('-j, --json', 'Output in JSON format')
      .action(async (input, options) => {
        const config = this.buildConfig(this.program.opts());
        await tokensCommand(input, options, config);
      });

    // Models command to list available models
    this.program
      .command('models')
      .alias('list')
      .description('List available DeepSeek models')
      .action(() => {
        console.log(chalk.cyan('\nAvailable DeepSeek Models:\n'));
        Object.entries(AVAILABLE_MODELS).forEach(([key, value]) => {
          console.log(`${chalk.bold(value)} - ${this.getModelDescription(value)}`);
        });
        console.log('');
      });

    // Help command
    this.program
      .command('help')
      .description('Display help information')
      .action(() => {
        console.log(helpText);
      });

    // Additional human-friendly aliases
    this.program
      .command('explain <topic>')
      .description('Get an explanation on a topic')
      .action(async (topic, options) => {
        const config = this.buildConfig(this.program.opts());
        await chatCommand(`Please explain ${topic} in a clear and concise way.`, config);
      });

    this.program
      .command('fix <file>')
      .description('Fix issues in a code file')
      .action(async (file, options) => {
        const config = this.buildConfig(this.program.opts());
        const fs = require('fs');
        const path = require('path');
        
        try {
          const fileContent = fs.readFileSync(file, 'utf8');
          const fileName = path.basename(file);
          const fileExt = path.extname(file).substring(1);
          
          const prompt = `Please fix the issues in this ${fileExt} code and provide the corrected version:

\`\`\`${fileExt}
${fileContent}
\`\`\`

Please explain what you fixed and why.`;
          
          await chatCommand(prompt, config);
        } catch (error) {
          console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
          process.exit(1);
        }
      });

    this.program
      .command('improve <file>')
      .description('Suggest improvements for a code file')
      .action(async (file, options) => {
        const config = this.buildConfig(this.program.opts());
        const fs = require('fs');
        const path = require('path');
        
        try {
          const fileContent = fs.readFileSync(file, 'utf8');
          const fileName = path.basename(file);
          const fileExt = path.extname(file).substring(1);
          
          const prompt = `Please suggest improvements for this ${fileExt} code:

\`\`\`${fileExt}
${fileContent}
\`\`\`

Focus on:
1. Code quality and readability
2. Performance optimizations
3. Best practices
4. Modern language features`;
          
          await chatCommand(prompt, config);
        } catch (error) {
          console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
          process.exit(1);
        }
      });

    this.program
      .command('cost <text>')
      .description('Estimate the cost of processing text')
      .option('-f, --file', 'Treat input as a file path')
      .action(async (text, options) => {
        const config = this.buildConfig(this.program.opts());
        await tokensCommand(text, { ...options, json: false }, config);
      });

    // Setup command for local installation
    this.program
      .command('setup')
      .description('Setup local Ollama environment')
      .action(async () => {
        const config = this.buildConfig(this.program.opts());
        await setupCommand(config);
      });

    // Default action (interactive mode)
    this.program
      .action(async () => {
        // If no command is specified but help is requested, show help
        if (this.program.opts().help) {
          console.log(helpText);
          return;
        }
        
        const config = this.buildConfig(this.program.opts());
        
        // Show welcome
        console.log(chalk.cyan('\n🚀 DeepSeek CLI\n'));
        console.log(chalk.gray('Mode:'), config.useLocal ? chalk.green('Local (Ollama)') : chalk.blue('Cloud'));
        console.log(chalk.gray('Model:'), chalk.white(config.model));
        if (config.useLocal) {
          console.log(chalk.gray('Ollama Host:'), chalk.white(config.ollamaHost));
        }
        if (config.include) {
          console.log(chalk.gray('Included File:'), chalk.white(config.include));
        }
        if (config.includeAll) {
          // Encontrar arquivos pelo pattern (ex: "src/*.ts")
          const files = globSync(config.includeAll);

          console.log(chalk.gray('Included Files:'), chalk.white(config.includeAll));
          if (files.length === 0) {
            console.error(chalk.red(`No files matched pattern: ${config.includeAll}`));
          } else {
            for (const filePath of files) {
              console.log(chalk.gray('Included File:'), chalk.white(filePath));
            }
          }
        }
        console.log(chalk.gray('Type "exit" or Ctrl+C to quit\n'));
        
        await interactiveCommand(config);
      });
  }

  private async reasonCommand(prompt: string, config: Config): Promise<void> {
    const spinner = ora('Thinking...').start();
    
    try {
      const api = new DeepSeekAPI(config);
      const response = await api.completeWithReasoning(prompt);
      
      spinner.stop();
      
      if (config.showReasoning && response.reasoningContent) {
        console.log(chalk.cyan('\n--- Reasoning Process ---'));
        console.log(response.reasoningContent);
        console.log(chalk.cyan('\n--- Final Answer ---'));
      }
      
      console.log('\n' + this.formatResponse(response.content) + '\n');
      
      // Display token usage if available
      if (response.usage) {
        this.displayTokenUsage(response.usage);
      }
    } catch (error) {
      spinner.stop();
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }

  private displayTokenUsage(usage: TokenUsage): void {
    console.log(chalk.dim('─'.repeat(40)));
    console.log(chalk.dim('Token Usage:'));
    console.log(chalk.dim(`  Input: ${usage.promptTokens} tokens`));
    console.log(chalk.dim(`  Output: ${usage.completionTokens} tokens`));
    console.log(chalk.dim(`  Total: ${usage.totalTokens} tokens`));
    console.log(chalk.dim(`  Estimated Cost: $${usage.estimatedCost.toFixed(6)}`));
    console.log(chalk.dim('─'.repeat(40)));
  }

  private getModelDescription(model: string): string {
    switch (model) {
      case AVAILABLE_MODELS.CHAT:
        return 'General purpose chat model';
      case AVAILABLE_MODELS.REASONER:
        return 'Advanced reasoning capabilities for complex problems';
      default:
        return 'Unknown model';
    }
  }

  private formatResponse(response: string): string {
    // Format code blocks
    let formatted = response.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const header = lang ? chalk.gray(`\`\`\`${lang}`) : chalk.gray('```');
      return header + '\n' + chalk.white(code.trim()) + '\n' + chalk.gray('```');
    });
    
    // Format headers
    formatted = formatted.replace(/^#{1,3} (.+)$/gm, chalk.bold.cyan('$1'));
    
    // Format bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, chalk.bold('$1'));
    
    return formatted;
  }

  private buildConfig(options: any): any {
    const config = getConfig();
    
    // Override with CLI options
    if (options.apiKey) config.apiKey = options.apiKey;
    if (options.model) config.model = options.model;
    if (options.local) config.useLocal = true;
    if (options.ollamaHost) config.ollamaHost = options.ollamaHost;

    if (options.temperature) config.temperature = parseFloat(options.temperature);
    if (options.maxTokens) config.maxTokens = parseInt(options.maxTokens, 10);
    if (options.stream !== undefined) config.stream = options.stream;
    if (options.showReasoning !== undefined) config.showReasoning = options.showReasoning;
    
    if (options.include !== undefined) config.include = options.include;
    if (options.includeAll !== undefined) config.includeAll = options.includeAll;

    // Update API URL if local mode is forced
    if (config.useLocal) {
      config.apiUrl = `${config.ollamaHost}/api/chat`;
    }
    
    // Validate based on mode
    if (!config.useLocal && !config.apiKey) {
      throw new Error(
        'API key required for cloud mode. Set DEEPSEEK_API_KEY or use --api-key flag.\n' +
        'Get your key at: https://platform.deepseek.com/api_keys\n' +
        'Or use local mode with --local flag'
      );
    }
    
    return config;
  }

  async run(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
