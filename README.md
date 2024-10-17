# Form Mock Server

The following project is a simply mock server that can be used for Forms epic testing. 
It uses `firebase functions` to serve the APIs and pages necessary for the form tests.

Stacks used
- expressjs


## Prerequisite

### setup firebase 

In order to deploy this to a `firebase` project, you need to have created a `firebase` project. 

You will also need to have `firebase-tools`. Install with

```bash
$ npm i -g firebase-tools
```
once installed, run
```bash
firebase login
```
This will bring up a prompt on chrome. Please use the correct `google` credentials. you will need to change the project to match the `project` you created.

```bash
firebase use <project_id>
```

### npm install

there is an `nvmrc` file on the root of the project (node 18) use `nvm use` or `nvm install` to have the correct *node* version to work with.

once node version is set to 18 **go to** `functions` directory. and run `npm install` to install necessary packages.

```bash
npm install
```

## Run app

### Running the webapp locally

Go to the root path of the project (it should not be in `functions`)

run the follwoing command:

```bash
firebase serve --only functions,hosting
```

This will mock a fireabse deploy on local. When deployment is successful, there will be a `Local server` information that can be used to access the Mock Form server

```bash 
i  functions: Watching "/Users/seungwon/workspace/samsonites/form-mock/functions" for Cloud Functions...
i  hosting[form-demo-24b4f]: Serving hosting files from: public
✔  hosting[form-demo-24b4f]: Local server: http://localhost:5002
⚠  functions: package.json indicates an outdated version of firebase-functions. Please upgrade using npm install --save firebase-functions@latest in your functions directory.
⚠  functions: Please note that there will be breaking changes when you upgrade.
✔  functions: Using node@18 from host.
Serving at port 8621

✔  functions: Loaded functions definitions from source: app.
✔  functions[us-central1-app]: http function initialized (http://localhost:5001/form-demo-24b4f/us-central1/app).

```

## Deploy App

The app can be deployed with the following command.

```bash
firebase deploy
```

At the end of the command, there will be a url that can be used to access the app being served on firebase

```bash
i  hosting[form-demo-24b4f]: beginning deploy...
i  hosting[form-demo-24b4f]: found 1 files in public
✔  hosting[form-demo-24b4f]: file upload complete
i  functions: updating Node.js 18 (1st Gen) function app(us-central1)...
✔  functions[app(us-central1)] Successful update operation.
Function URL (app(us-central1)): https://us-central1-form-demo-24b4f.cloudfunctions.net/app
i  functions: cleaning up build files...
⚠  functions: Unhandled error cleaning up build images. This could result in a small monthly bill if not corrected. You can attempt to delete these images by redeploying or you can delete them manually at https://console.cloud.google.com/gcr/images/form-demo-24b4f/us/gcf
i  hosting[form-demo-24b4f]: finalizing version...
✔  hosting[form-demo-24b4f]: version finalized
i  hosting[form-demo-24b4f]: releasing new version...
✔  hosting[form-demo-24b4f]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/form-demo-24b4f/overview
Hosting URL: https://form-demo-24b4f.web.app

```

Hosting URL: https://form-demo-24b4f.web.app


## Routes

The app has the follwing routes:
- `/` : welcome page
- `/form` : form related pages
- `/configs`: config related page
- [WIP]`/login` : login page for auth

There is also a middleware that has been commented out. Once applied, it should disable uses with incorrect email information from changing the `config`.

### `/configs`

The config route is a simple page that can be used to modify the `shared_secret` value. Click submit to update the value. The value is being stored on firebase (my personal at the moment)

### `/form`

The `/form` route will display the form that needs to be served in the iframe.
The form will use `postMessage` form `formComplete` events. The `formComplete` events are generated via a internal API call.

There are subroutes for `preview`

- `/form/preview` : form preview (essentialyl the `form`)

#### APIS

- `POST /form/uri` : API to generate `form_data` value with url
    needs: `external_form_id` and `smart_action_id` in the body.

    a sample response is as follows. The response will provide a url

    ```json
    {
        "type": "form_data",
        "signature": "4V/Y1eVuosBM8/kJ1BirxO+4Q4PP87IguawtFT/2iYQ=",
        "data": {
            "external_form_id": "asbcd",
            "smart_action_id": 12,
            "uri": "https://form-demo-24b4f.web.app/form?smart_action_id=12"
        }
    }
    ```