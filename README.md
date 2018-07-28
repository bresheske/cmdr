# cmdr
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

To run the saved command:
```
c ls
```

To remove the saved command:
```
c -r ls
```
