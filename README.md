# Voting Module Sidechain

This project was bootstrapped with [Klayr SDK](https://github.com/Klayrhq/klayr-sdk)
This project implements a Voting Module designed for efficient poll creation, management, and voting processes. It allows users to create polls, dynamically add options, cast votes, and retrieve results securely.

## Project Overview

### The Vote Verification Sidechain is designed to:

- Allow users to create polls with titles, descriptions and expiration period.
- Dynamically add poll options with initial vote counts set to zero
- Enable users to cast votes for specific options.
- Retrieve poll results, including vote counts for each option.
- Prevent voting on expired polls.

## Key Components

- VotingModule: Orchestrates the voting process, including poll creation, voting, and result calculation.
- PollStore: Stores poll data, including identification, title, description, pollCreator and expiredAt details.
- PollOptionsStore: Keeps track of poll options that can be voted for.
- VoteStore: Records votes associated with polls, and user identification that voted.
- CreatePollCommand: Handles poll creation and storage.
- CreateOptionsCommand: Allow Poll creator to add options for their vote
- CreateVoteCommand: Processes and stores user votes.
- VotingVerifierEndpoint: Exposes API endpoints for interacting with the sidechain.

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

### Create Poll

```
./bin/run transaction:create voting createPoll 10000000 --params='{"pollId": "1", "title":"Favorite Programming Language new",  "description": "Vote for your new  favorite programming language", "timestamp": 1734998400}'
```

### Send the created transaction

```
./bin/run transaction:send <binary_transaction_output>
```

### Create Poll Options:

```
./bin/run transaction:create voting createPollOptions 10000000 --params='{"pollId": "1", "text":"C++"}' --json --pretty
```

### Send the created transaction

```
./bin/run transaction:send <binary_transaction_output>
```

### Create Vote for Poll Options:

```
./bin/run transaction:create voting createVote 10000000 --params='{"pollId": "1","userId": "1", "text":"C++"}' --json --pretty

```

### Send the created transaction

```
./bin/run transaction:send <binary_transaction_output>
```

### Get content

```
./bin/run endpoint:invoke voting_getPoll '{"pollId": "1"}'
```

### Get VotingOptions

```
./bin/run endpoint:invoke voting_getPollOptionsVote '{"pollId": "1", "text": "C++"}'
```

### Get Voter

```
./bin/run endpoint:invoke voting_getVoters '{"userId": "1"}'
```

## Future Improvements

- Allow ranked-choice or weighted voting mechanisms.
- Expiration Poll not accepting vote

## License

This project is licensed under the Apache License 2.0.

## Discord Username

- ayo7026

## Learn More

You can learn more in the [documentation](https://klayr.xyz/documentation/klayr-sdk/).
