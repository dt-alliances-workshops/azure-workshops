# Lab 1: Setting up Environment

## 1.4 Collect Inputs

The next steps of this guide will have you gather various information from your Dynatrace environment needed to configure your environment and for the lab exercises.

From your Dynatrace environment, you will capture:

* Dynatrace Base URL
* Dynatrace Platform Token
* Dynatrace API token

??? info
    - The `Base URL` will be in the Dynatrace tenant URL such as: `https://[ENVIRONMENT ID].apps.dynatrace.com/`.
    - The `Platform Token` will be token generated in the previous step when you setup your Dynatrace envrionment. 
    -   The `Classic Access Token` will  generated for OTEL traces in Lab5.

### Tasks to complete this step

In the code repo you cloned, there is a simple UNIX shell script that prompts for values and writes them to a file called `gen/workshop-credentials.json`. Later in the labs, there are a few other simple UNIX shell scripts that will automate the step that reads this file so that you don't need to type or copy-paste these values over and over again during the workshop.

??? info
    📓 If you mess up, just click [enter] through the rest of the values and save it at the ending prompt.  You can then just re-run the script and the script will prompt you again to re-enter each value showing you each current value that it saved.

1. Run the input credentials Unix script

    ```
    cd ~/azure-modernization-dt-orders-setup/provision-scripts
    ./input-credentials.sh
    ```
   1. Enter in the approprite values for the three inputs at the prompt
     ```
      ==================================================================
      Please enter your Dynatrace credentials as requested below:
      Press <enter> to keep the current value
      ===================================================================
      Dynatrace Base URL              (current: https://abc12345.apps.dynatrace.com) :
      Dynatrace Platform  Token      (current: dt0s16.) :      
      Dynatrace Classic Access Token (current: dtco1.)
      ===================================================================
     ```
   1. Confirm all of the inputs are correct.
    ??? info
        📓 There are some derived values the script generated based on your input.

1. Once you confirm, the data is saved off `../gen/workshop-credentials.json` and will be used by the provision script in the next step.



!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - The `input-credentials.sh` script completed successfully
    - The `workshop-credentials.json` file was created in the `gen` folder
    - You saved the **Dynatrace Operator Token** and **API URL** values for Lab 3
