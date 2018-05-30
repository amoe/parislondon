# parislondon

The key needs to be provided from the outside file `~/.apikey.json`.

    {
        "GOOGLE_MAPS_API_KEY": "AIzaSyBqfBtliy4zL76AcW22ESgXA3CyPk9orpE"
    }


## Build & Deploy

Build: `make -f main.mk dist`

Deploy: `npx shipit staging deploy`
