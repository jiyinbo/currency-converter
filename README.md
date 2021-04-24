# Currency Converter

This project helps with currency conversion from a specified base currency and amount to selected target currency. It also shows the rate that was used for the conversion, and the equivalent value in other currencies the user might be interested in. Optionally, a user may select an earlier date, and conversion will be done based on the exchange rate for that day.

### Prerequisites

1. To start the app locally, You need to have docker installed on your machine. You can find instructions on how to install it here https://docs.docker.com/install/
2. You also need npm installed on your machine. For this, follow the instructions here to download and install node https://nodejs.org/en/download/
3. Clone this repository to your local machine

## Getting Started

Follow these steps to start the application in a docker container
1. Navigate to the folder where this readme file is, through any command line interface (Powershell, Command prompt, Git Bash...)
2. Run "docker-compose up" without the quotes
3. If there are any failures, run "docker-compose down" then "docker-compose up" again. The command starts the currency converter application within a docker container

You can also start the application locally without docker by following these steps
1. Navigate to the folder where this readme file is, through any command line interface (Powershell, Command prompt, Git Bash...)
2. Run "npm install" to install project dependencies
3. Run "npm run serve" to start webpack development server locally (this may take a few seconds, please be patient).
4. Wait till you see - App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.8.100:8080/

The currency converter can now be accessed by loading the following URL on any browser:
http://localhost:9090/

## Running the tests

To run the tests, navigate to the currency-converter directory, on any command line interface and run "mpm run test".

## Deployment

To deploy this app on a live system, you will need to set up a cluster environment, with any cluster management tool. I suggest kubernetes. 

## Built With

* [Vue.js](https://vuejs.org/) - The frontend framework used
* [Rates API](https://ratesapi.io/) - The source of conversion rates data

## Demo

You can find a quick demo of the project here https://currency-converter21.netlify.app/

## Improvements

- Application look and feel (with custom components) can be further improved
- User experience can be further improved by automatically detecting their locale and have their currency preselected
- Dropdowns for selecting currencies can be made searchable
- Pagination and ability to sort and filter table data can be introduced in other currency conversions table
- Although rates api used does not make provision for this, flags corresponding to currencies can be added to currency select dropdowns

## Acknowledgments

* Rates API served as the source of rates conversion data. https://ratesapi.io/
