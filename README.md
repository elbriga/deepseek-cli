# DeepSeek CLI
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![npm version](https://badge.fury.io/js/run-deepseek-cli.svg)](https://www.npmjs.com/package/run-deepseek-cli)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

![image](https://github.com/user-attachments/assets/5686866b-a841-4303-b7c4-c2c437816644)

This repository contains the DeepSeek CLI, a command-line AI assistant that leverages the powerful DeepSeek models to accelerate your development workflows and enhance your coding experience.

With the DeepSeek CLI you can:

- **Code Completion & Generation**: Get intelligent code suggestions and generate complete functions across multiple programming languages.
- **Code Analysis & Review**: Analyze code for quality, bugs, and improvements.
- **Problem Solving with Reasoning**: Solve complex problems with the reasoning capabilities of DeepSeek models.
- **Interactive Chat**: Have multi-turn conversations about coding and other topics.
- **Multiple Models**: Choose between different DeepSeek models for different tasks.
- **Streaming Responses**: Get real-time responses as they're generated.

## Quickstart

### 🏠 Local Setup (Recommended - Free & Private)

1. **Prerequisites:** 
   - [Node.js version 18](https://nodejs.org/en/download) or higher
   - [Ollama](https://ollama.ai) for local AI models

2. **Install Ollama:**
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows: Download from https://ollama.ai
   ```

3. **Install the CLI:**
   ```bash
   npm install -g run-deepseek-cli
   ```

4. **Setup Local Environment:**
   ```bash
   # Start Ollama service
   ollama serve
   
   # Install DeepSeek Coder model (choose one)
   ollama pull deepseek-coder:6.7b    # Recommended (4GB)
   ollama pull deepseek-coder:1.3b    # Lightweight (1GB)
   ollama pull deepseek-coder:33b     # Most capable (19GB)
   ```

5. **Start Using:**
   ```bash
   deepseek
   ```

### ☁️ Cloud Setup (Requires API Key)

1. **Install the CLI:**
   ```bash
   npx run-deepseek-cli
   ```

2. **Configure API Access:** Set up your DeepSeek API key using one of these methods:

   **Option 1: Environment variable**
   ```bash
   export DEEPSEEK_API_KEY="your_api_key_here"
   export DEEPSEEK_USE_LOCAL=false
   ```

   **Option 2: Configuration file**
   Create a `.deepseekrc` file in your home directory:
   ```json
   {
     "apiKey": "your_api_key_here",
     "model": "deepseek-chat",
     "temperature": 0.2
   }
   ```

   **Option 3: Command line option**
   ```bash
   deepseek --api-key="your_api_key_here" chat "Hello"
   ```

   Get your API key from [DeepSeek Platform](https://platform.deepseek.com/api_keys).

3. **Choose Your Model:** The CLI supports multiple DeepSeek models:
   - `deepseek-chat` (General purpose chat model)
   - `deepseek-reasoner` (Advanced reasoning capabilities)

   View available models with:
   ```bash
   deepseek models
   ```

  You are now ready to use the DeepSeek CLI!

4. **Start Using:**
   ```bash
   deepseek
   ```

## Examples

Once the CLI is running, you can start interacting with DeepSeek from your shell.

### Start a New Project

```sh
cd new-project/
deepseek
> Create a FastAPI web application with user authentication and a PostgreSQL database
```

### Work with Existing Code

```sh
git clone https://github.com/your-repo/existing-project
cd existing-project
deepseek
> Analyze this codebase and suggest performance optimizations
```

### Code Completion and Generation

```sh
deepseek
> Write a Python function to implement binary search with proper error handling

### Chat with DeepSeek

```sh
# Single prompt
deepseek chat "Write a Python function to implement binary search with proper error handling"

# Interactive mode
deepseek
> Write a Python function to implement binary search with proper error handling

# Streaming responses
deepseek --stream chat "Write a Python function to implement binary search with proper error handling"
```

### Analyze Code

```sh
# Analyze a code file
deepseek analyze path/to/your/file.js

# Analyze with the reasoning model
deepseek --model deepseek-reasoner analyze path/to/your/file.js
```

### Solve Problems with Reasoning

```sh
# Use the reason command for complex problems
deepseek reason "Solve this math problem: If x + y = 10 and x * y = 24, what are the values of x and y?"

# Show the reasoning process
deepseek reason --show-reasoning "Solve this math problem: If x + y = 10 and x * y = 24, what are the values of x and y?"

## Popular Tasks

### Explore and Understand Code

Start by `cd`ing into an existing or newly-cloned repository and running `deepseek`.

```text
> Explain the architecture of this application and identify the main components.
```

```text
> What design patterns are used in this codebase?
```

```text
> Find potential security vulnerabilities in this code.
```

### Code Generation and Refactoring

```text
> Implement a REST API for user management with CRUD operations.
```

```text
> Refactor this class to follow SOLID principles.
```

```text
> Add comprehensive error handling to this module.
```

### Migration and Modernization

```text
> Help me migrate this React class component to hooks.
```

```text
> Convert this Python 2.7 code to Python 3.10 with type hints.
```

```text
> Upgrade this Express.js app to use async/await instead of callbacks.
```

### Code Review and Quality

```text
> Review this pull request and suggest improvements.
```

```text
> Add unit tests for all functions in this file.
```

```text
> Optimize this algorithm for better time complexity.
```

### Project Setup

```text
> Create a React TypeScript project with Redux Toolkit and Material-UI.
```

```text
> Set up a Django project with Docker, PostgreSQL, and Redis.
```

```text
> Generate a microservices architecture using Node.js and Docker Compose.
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEEPSEEK_USE_LOCAL` | Use local Ollama instead of cloud API | `true` |
| `DEEPSEEK_API_KEY` | DeepSeek API key (cloud mode only) | - |
| `DEEPSEEK_MODEL` | Model to use | `deepseek-coder:6.7b` |
| `OLLAMA_HOST` | Ollama server URL | `http://localhost:11434` |
| `DEEPSEEK_API_URL` | API endpoint | `https://api.deepseek.com/chat/completions` |
| `DEEPSEEK_MAX_TOKENS` | Maximum tokens per response | `4096` |
| `DEEPSEEK_TEMPERATURE` | Response creativity (0.0-1.0) | `0.1` |
| `DEEPSEEK_STREAM` | Enable streaming responses | `false` |
| `DEEPSEEK_SHOW_REASONING` | Show reasoning process | `false` |

### Configuration File

Create a `.deepseekrc` file in your home directory:

```json
{
  "apiKey": "your_api_key_here",
  "model": "deepseek-chat",
  "temperature": 0.2,
  "maxTokens": 4096,
  "stream": true,
  "showReasoning": false
}
```

### Local Models Available

| Model | Size | Memory | Best For |
|-------|------|--------|----------|
| `deepseek-coder:1.3b` | 1GB | 2GB RAM | Quick completions, lightweight tasks |
| `deepseek-coder:6.7b` | 4GB | 8GB RAM | General coding, recommended |
| `deepseek-coder:33b` | 19GB | 32GB RAM | Complex analysis, best quality |

### Configuration File

Create a `.env` file in your project root:

```bash
# Local mode (default)
DEEPSEEK_USE_LOCAL=true
DEEPSEEK_MODEL=deepseek-coder:6.7b
OLLAMA_HOST=http://localhost:11434

# Cloud mode (optional)
# DEEPSEEK_USE_LOCAL=false
# DEEPSEEK_API_KEY=your_api_key_here
```

## Supported Programming Languages

DeepSeek CLI supports intelligent code generation and completion for 100+ programming languages including:

**Popular Languages:**
`Python`, `JavaScript`, `TypeScript`, `Java`, `C++`, `C#`, `Go`, `Rust`, `PHP`, `Ruby`, `Kotlin`, `Swift`, `Scala`, `R`, `Julia`, `Dart`, `HTML`, `CSS`, `SQL`

**Systems & Scripting:**
`Shell`, `PowerShell`, `Bash`, `Dockerfile`, `Makefile`, `YAML`, `JSON`, `XML`

**Specialized:**
`CUDA`, `Assembly`, `Verilog`, `VHDL`, `Solidity`, `Protocol Buffer`, `Thrift`

For the complete list, see [Supported Languages](./docs/supported-languages.md).

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `-k, --api-key <key>` | DeepSeek API key | From config |
| `-m, --model <model>` | Model to use | `deepseek-chat` |
| `-i, --include <file>` | Include one file | |
| `-a, --include-all <filePattern>` | Include files from pattern | |
| `-t, --temperature <temp>` | Temperature (0.0-1.0) | `0.1` |
| `--max-tokens <tokens>` | Maximum tokens in response | `4096` |
| `-s, --stream` | Enable streaming responses | `false` |
| `-r, --show-reasoning` | Show reasoning process | `false` |

## CLI Commands and Aliases

DeepSeek CLI provides both technical commands and human-friendly aliases to accommodate users with different preferences and technical backgrounds.

### Core Commands and Aliases

| Command | Alias | Description |
|---------|-------|-------------|
| `deepseek` | - | Start interactive mode |
| `deepseek chat <prompt>` | `deepseek ask <prompt>` | Send a single prompt |
| `deepseek reason <prompt>` | `deepseek solve <prompt>` | Solve complex problems with reasoning |
| `deepseek analyze <file>` | `deepseek review <file>` | Analyze a code file |
| `deepseek tokens <input>` | `deepseek count <input>` | Count tokens and estimate costs |
| `deepseek models` | `deepseek list` | List available models |

### Task-Specific Commands

| Command | Description |
|---------|-------------|
| `deepseek explain <topic>` | Get an explanation on a specific topic |
| `deepseek fix <file>` | Fix issues in a code file |
| `deepseek improve <file>` | Suggest improvements for a code file |
| `deepseek cost <text>` | Estimate the cost of processing text |
| `deepseek help` | Show help information |
| `deepseek --version` | Show version |
| `deepseek` | Start interactive mode |
| `deepseek setup` | Setup local Ollama environment |
| `deepseek chat "prompt"` | Single prompt mode |
| `deepseek --local` | Force local mode |
| `deepseek --model <model>` | Specify model to use |
| `deepseek --help` | Show help information |
| `deepseek --version` | Show version |

### Setup Command

The setup command helps you install and configure the local environment:

```bash
deepseek setup
```

This will:
- Check if Ollama is installed
- Start Ollama service if needed
- Download the specified DeepSeek model
- Verify everything is working

### Interactive Mode

The interactive mode provides a REPL experience:

- **Syntax Highlighting**: Color-coded responses for better readability
- **Code Block Detection**: Automatic language detection and formatting
- **Multi-turn Conversations**: Maintain context across interactions

## Available Models

| Model | Description | Best For |
|-------|-------------|----------|
| `deepseek-chat` | General purpose chat model | Code generation, explanations, general assistance |
| `deepseek-reasoner` | Advanced reasoning capabilities | Complex problems, mathematical reasoning, logical analysis |

## Advanced Features

### Repository Context

DeepSeek CLI automatically analyzes your repository structure and includes relevant context:

```bash
# Analyze entire repository
deepseek --include-all
> Suggest improvements for the overall code architecture

# Include specific files/directories
deepseek --include src/ tests/ README.md
> Update the documentation to reflect recent API changes

### Streaming Responses

Get real-time responses as they're generated:

```bash
deepseek --stream chat "Explain how quantum computing works"
```

### Chain of Thought Reasoning

See the model's reasoning process when solving complex problems:

```bash
deepseek reason --show-reasoning "What is the derivative of f(x) = x^3 + 2x^2 - 5x + 7?"
```

### Token Counting and Cost Estimation

Count tokens and estimate API costs for text or files:

```bash
# Count tokens in text
deepseek tokens "Your text here"

# Count tokens in a file
deepseek tokens -f path/to/file.txt

# Specify model and time period for accurate cost estimation
deepseek tokens -f path/to/file.txt -m deepseek-reasoner -t discount

# Get JSON output for programmatic use
deepseek tokens "Your text here" -j
```

### Code Templates

Generate common patterns and boilerplate:

```text
> Generate a React component template with props validation
> Create a Python class with proper docstrings and type hints
> Set up a GitHub Actions workflow for CI/CD
```

### Integration Workflows

```text
> Analyze the git diff and write a commit message
> Generate API documentation from this OpenAPI spec
> Create database migration scripts from these model changes
```

### Contextual Token Information

The CLI now provides contextual token usage information after each API call:

- **Token Usage Display**: See token counts and cost estimates after each command
- **Interactive Mode Stats**: Type `stats` in interactive mode to see session totals
- **Session Summary**: View total token usage and costs when exiting interactive mode

This helps you:
- Monitor your API usage in real-time
- Track costs across multiple requests
- Optimize your prompts for token efficiency
- Plan your API budget more effectively

## Documentation Structure

The documentation for the DeepSeek CLI is organized into two main folders:

### API Reference Documentation (api-docs)

The `api-docs` folder contains detailed API reference documentation for the DeepSeek API. This includes:

- API endpoints and their parameters
- Request and response formats
- Authentication information
- Error handling

This documentation is essential for developers who need to understand the technical details of the API.

### Feature Guides and Tutorials (deepseek-docs)

The `deepseek-docs` folder contains guides and tutorials on how to use specific features of the DeepSeek API. This includes:

- Function calling examples
- JSON mode usage
- Reasoning model examples
- Multi-round chat examples
- And more

These guides are useful for understanding concepts and seeing examples of how to use the API features.

Both sets of documentation are valuable and complement each other. When implementing a feature, it's recommended to consult both the API reference and the relevant guides.

## Installation Options

### NPM (Recommended)

```bash
npm install -g run-deepseek-cli
```

### Development Installation

```bash
git clone https://github.com/your-username/deepseek-cli.git
cd deepseek-cli
npm install
npm run build
npm link
```

### Docker

```bash
docker run -it -v $(pwd):/workspace -e DEEPSEEK_API_KEY=your_key deepseek/cli
```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Build the project: `npm run build`
5. Test your changes
6. Submit a pull request

### Building from Source

```bash
npm run build
npm run package
```

## Documentation

- [Full Documentation](./docs/index.md)
- [API Reference](./docs/api.md)
- [Configuration Guide](./docs/configuration.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Examples & Tutorials](./docs/examples.md)

## Performance & Limits

| Model | Speed | Context Window | Best For |
|-------|-------|----------------|----------|
| deepseek-coder-1.3b-instruct | Fastest | 16K tokens | Quick completions |
| deepseek-coder-6.7b-instruct | Fast | 16K tokens | General coding tasks |
| deepseek-coder-33b-instruct | Slower | 16K tokens | Complex analysis |

## DeepSeek Models

This project leverages the DeepSeek Coder models:

- **DeepSeek Coder Base**: Pre-trained on 2T tokens (87% code, 13% natural language)
- **DeepSeek Coder Instruct**: Fine-tuned for instruction following and chat
- **Multi-size Options**: 1.3B, 6.7B, and 33B parameter models available

For more details about the models, visit the [DeepSeek Coder GitHub repository](https://github.com/deepseek-ai/deepseek-coder).

## Troubleshooting

### Common Issues

**API Key Issues:**
```bash
export DEEPSEEK_API_KEY="your_actual_api_key"
# Check if your API key is set
echo $DEEPSEEK_API_KEY

# Or pass it directly
deepseek --api-key="your_api_key" chat "Hello"
```

**Node.js Version:**
```bash
node --version  # Should be 18+
npm update -g deepseek-cli
```

**Configuration File:**
```bash
# Create or edit your .deepseekrc file
echo '{"apiKey": "your_api_key", "model": "deepseek-chat"}' > ~/.deepseekrc
```

**Model Not Found:**
```bash
# List available models
deepseek models

# Use a valid model
deepseek --model deepseek-chat chat "Hello"
```

**Permission Errors:**
```bash
sudo npm install -g run-deepseek-cli
# Or use a Node version manager like nvm
```

For more troubleshooting help, see our [Troubleshooting Guide](./docs/troubleshooting.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

The use of DeepSeek Coder models is subject to the [DeepSeek Model License](https://github.com/deepseek-ai/deepseek-coder/blob/main/LICENSE-MODEL).

## Citation

If you use this tool in your research or projects, please cite:

```bibtex
@misc{deepseek-cli,
  title={DeepSeek CLI: Command-Line AI Coding Assistant},
  author={Your Name},
  year={2025},
  url={https://github.com/your-username/deepseek-cli}
}

@misc{deepseek-coder,
  author={Daya Guo, Qihao Zhu, Dejian Yang, Zhenda Xie, Kai Dong, Wentao Zhang, Guanting Chen, Xiao Bi, Y. Wu, Y.K. Li, Fuli Luo, Yingfei Xiong, Wenfeng Liang},
  title={DeepSeek-Coder: When the Large Language Model Meets Programming -- The Rise of Code Intelligence},
  journal={CoRR},
  volume={abs/2401.14196},
  year={2024},
  url={https://arxiv.org/abs/2401.14196}
}
```

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/holasoymalva/deepseek-cli/issues)
- **Discussions**: [GitHub Discussions](https://github.com/holasoymalva/deepseek-cli/discussions)
- **DeepSeek Support**: service@deepseek.com

## Acknowledgments

- Built on the foundation of [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- Powered by [DeepSeek Coder](https://github.com/deepseek-ai/deepseek-coder) models
- Thanks to the open-source community for contributions and feedback
