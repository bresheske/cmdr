# cmdr
![coverage](https://img.shields.io/badge/Coverage-100%25-green.svg)

Easy saving / running custom commands.

## Installation
First, run the build script:

```bash
npm i
npm run build
```

Secondly, add the dist folder into your PATH variable. 'c.exe' should now be available anywhere.

## Usage

To save a new command:
```
c -s ls dir
```

To run a saved command:
```
c ls
```

To remove a saved command:
```
c -r ls
```

To rename a saved command:
```
c -n ls dir
```
