# Getting Started with Klayr Blockchain Client

This project was bootstrapped with [Klayr SDK](https://github.com/Klayrhq/klayr-sdk)

### Start a node

```
./bin/run start
```

### Add a new module

```
klayr generate:module ModuleName
// Example
klayr generate:module token
```

### Add a new command

```
klayr generate:command ModuleName Command
// Example
klayr generate:command token transfer
```

### Add a new plugin

```
klayr generate:plugin PluginName
// Example
klayr generate:plugin httpAPI
```

## Learn More

You can learn more in the [documentation](https://klayr.xyz/documentation/klayr-sdk/).


# Voting Module Sidechain

This project was bootstrapped with [Klayr SDK](https://github.com/Klayrhq/klayr-sdk)
This project implements a Voting Module designed for efficient poll creation, management, and voting processes. It allows users to create polls, dynamically add options, cast votes, and retrieve results securely.

## Project Overview
### The Content Verification Sidechain is designed to:

- Allow users to create polls with titles, descriptions and expiration period.
- Dynamically add poll options with initial vote counts set to zero
- Enable users to cast votes for specific options.
- Retrieve poll results, including vote counts for each option.
- Prevent voting on expired polls.

## Key Components

- ContentVerifierModule: The main module that orchestrates the content verification process.
- VotingModule: Orchestrates the voting process, including poll creation, voting, and result calculation.
- ContentStore: Stores submitted content entries.
- StatsStore: Keeps track of global statistics for content submissions and verifications.
- UserReputationStore: Manages user reputation data.
- CreateContentCommand: Handles the creation and storage of new content entries.
- ContentVerifierMethod: Implements methods for retrieving content, stats, and user reputation.
- ContentVerifierEndpoint: Exposes API endpoints for interacting with the sidechain.

## Setup and Installation

### Ensure you have Node.js and npm installed.
### Clone the repository
```
git clone [repository-url]
```
### Install dependencies
```
npm install
```
### Build the project
```
npm run build
```

## Running the Sidechain

### Start a node
```
./bin/run start --config=config/custom_config.json
```

### The node will be available by default at
```
http://localhost:7887
```

## Interacting with the Sidechain

### Here are some example commands to interact with the sidechain:

- NOTE that a passPhrase is needed to create the transaction.

### Create content
```
./bin/run transaction:create contentVerifier createContent 10000000 --params='{"hash":"QmX4n5qKvqrA1JQFYqsdqhULtVXF6YHiH3CfDFX1YcBxEn", "userId":"user123", "timestamp":1633036800}' --json --pretty
```

### Send the created transaction
```
./bin/run transaction:send <binary_transaction_output>
```

### Verify Content:
```
./bin/run transaction:create contentVerifier verifyContent 10000000 --params='{"hash":"QmX4n5qKvqrA1JQFYqsdqhULtVXF6YHiH3CfDFX1YcBxEn"}' --json --pretty
```

### Send the created transaction
```
./bin/run transaction:send <binary_transaction_output>
```

### Get content
```
curl -X POST -H "Content-Type: application/json" -d @./test/api/getContent.json http://localhost:7887/rpc
```

### Get stats
```
curl -X POST -H "Content-Type: application/json" -d @./test/api/getStats.json http://localhost:7887/rpc
```

### Get user reputation
```
curl -X POST -H "Content-Type: application/json" -d @./test/api/getReputation.json http://localhost:7887/rpc
```

## Future Improvements

- Implement more secure content verification logic
- Add more robust error handling and input validation
- Implement a proper consensus mechanism for block creation
- Add comprehensive testing
- Implement proper key management and user authentication

## License
This project is licensed under the Apache License 2.0.

## Discord Username
- ayo7026

## Learn More

You can learn more in the [documentation](https://klayr.xyz/documentation/klayr-sdk/).