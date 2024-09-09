# Dynamic Plugins and dependency embedding in Red Hat Developer Hub

## Overview

> Note: The Dynamic Plugin functionality is a tech preview feature of Red Hat Developer Hub and is still under active development.  Aspects of developing, packaging and deployment of dynamic plugins are subject to change

This project shows how to embed a `common-library` dependency into frontend and backend dynamic plugins.  Plugins of type `common-library` are used to share functions and symbols between different frontend and backend plugins.  The most common use case is reflected in this example, where a frontend plugin, backend plugin and common library plugin are created with a particular naming convention:

* simple-chat - frontend plugin
* simple-chat-backend - backend plugin
* simple-chat-common - common library plugin

In this case a dependency is added to the `simple-chat-backend` and `simple-chat` frontend plugins on this `simple-chat-common` library.  

The `export-dynamic-plugin` command will examine a plugin's dependencies and when it finds a common library that matches the above naming convention it will be automatically embedded.

It's possible for a plugin to have more `common-library` dependencies that fall on plugins that don't follow the above naming pattern.  In this situation, the `export-dynamic-plugin` requires explicit instructution to embed these dependencies via the `--embed-dependency` option.

This example repository shows both of these use cases in practice in [plugins/simple-chat-backend](./plugins/simple-chat-backend/), where the backend of this service embeds a common library containing shared types and exports from `simple-chat-common` and uses an exported function from another common library called `some-other-common`.  In this case, the `package.json` is modified to update the `export-dynamic` command to explicitly embed the required common library.

## Prerequisites

> Note: These are basic prerequisites for building this repository.  For prerequisites for deployment see [here](https://github.com/gashcrumb/dynamic-plugins-getting-started?tab=readme-ov-file#prerequisites)

* node 20.x (node 18 may work fine also but untested)
* npm (10.8.1 was used during development)
* yarn (at least 3.8.1 is required)

## Building this example

To build this example on the command line after cloning:

```bash
yarn install
```

```bash
yarn tsc
```

```bash
yarn build:all
```

```bash
yarn export-dynamic
```

## Deploying this example

This example can be deployed following the instructions outlined [starting from here](https://github.com/gashcrumb/dynamic-plugins-getting-started?tab=readme-ov-file#phase-4---dynamic-plugin-deployment), the scripts in this copy have been updated appropriately.
