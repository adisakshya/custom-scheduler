[![Version](https://img.shields.io/badge/version-v1.0.0-green)](https://github.com/adisakshya/custom-scheduler)
[![MIT License](https://img.shields.io/github/license/adisakshya/custom-scheduler)](https://github.com/adisakshya/custom-scheduler/blob/master/LICENSE)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/adisakshya/custom-scheduler/pulls)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat)](https://continuous-improvement.readthedocs.io/en/latest/md/community/code_of_conduct.html)  

## Overview

All notifications generated are stored in the PostgreSQL notifications-database by the [event-service](https://github.com/adisakshya/event-service) with all the information required to send the notification to the client. The notification-scheduler is a lambda-function that is invoked using a cloud-watch schedule that triggers every 1 minute. When invoked, the scheduler retrieves the notification from the notification-database that are to be delivered in the next minute and forward them to the notification-sns-topic as notificaton-messages. The notification-sqs-queue subscribed to the notification-sns-topic recieves the notification-message as soon as it is published to the sns-topic. The [notification-service](https://github.com/adisakshya/notification-service) is continuously polling the notification-sqs-queue and send the incoming notification to the clients.

## Operating Instructions

### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/custom-scheduler](https://github.com/adisakshya/custom-scheduler/) repository to your GitHub account as `https://github.com/YourGitHubUserName/custom-scheduler`
- Or you can download or clone this repository
	- You can clone the repository executing below command in a location of your choice in your system
	- ```$ git clone https://github.com/adisakshya/custom-scheduler.git```
- Source code for the custom-scheduler can be found at ```/src```
- Serverless configuration is defined at ```/src/serverless.yml```

### Local Development

#### Prerequisites

- Make sure you have
    - Installed the severless framework
    - PostgreSQL ```notification-database``` running and is accessible using host-url, username and password
    - AWS SNS ```notification-topic``` setup and is accessible using ARN

#### Starting the scheduler

- In source directory ```src/``` run the following command
	- ```$ yarn install``` - install required dependencies
	- ```$ yarn build``` - build source code
	- ```$ yarn test``` - run test (optional)
	- ```$ yarn start``` - start the scheduler
- On successful start, the scheduler will be invoked every 1 minute and will start forwarding the notifications in the notification-database to the notification-sns-topic. 

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://continuous-improvement.readthedocs.io/en/latest/md/community/contributing.html).

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/custom-scheduler/blob/master/LICENSE).
