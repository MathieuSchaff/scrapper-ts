Project

This project demonstrates a basic automated browsing sequence using Puppeteer and Playwright in Node.js, with the specific goal of navigating and interacting with LinkedIn's job search. This tool is configurable through environment variables.
Environment Variables

Instructions

To run this project, make sure you have Node.js installed, then follow these steps:

    Clone the repository: git clone https://github.com/your-repo-link.

    Enter the project directory: cd your-project-folder.

    Install dependencies: npm install.

    Set your environment variables in a .env file at the root of your project. This file should look something like this:

    makefile

    LDK_USERNAME=your_email@example.com
    LDK_PASSWORD=your_password
    LDK_KEYWORD=software engineer
    LDK_LOCATION=San Francisco Bay Area
    LDK_REMOTE=2
    LDK_EXPERIENCE=4
    LDK_WORKPLACE=2

    Run the script: node app/linkedin/main.js.

Please remember to treat your .env file as sensitive data, and add it to your .gitignore file to ensure it's not accidentally committed to your repository.

Important: Please make sure to follow LinkedIn's terms of service when using this tool. Automated browsing may not be permitted under their user agreement. Always respect the terms of service of any website you interact with.
