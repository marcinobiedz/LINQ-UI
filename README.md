# LINQ Analyzer - UI
**LINQ Analyzer UI** is a client side, browser based, part of MSc application called **LINQ Analyzer**.
The application can work alone nevertheless it needs to be populated with a data in a proper format.
In case of mentioned MSc, it was designed to work with **LINQ Analyzer API** which can be found here:
- [LINQ Analyzer API](https://github.com/marcinobiedz/LINQapi)
## Requirements
To start the project you will need a few prerequisites installed:
- [Node.js](https://nodejs.org/en/) > 6.10.0
- NPM > 3.10.0
## Configuration
To start the project you will need to set several configuration variables.
Variables are to be set in a **config.json** file that can be found in a root of the project.
```
{
    "url": "*"
}
```
For now the only configurable variable is the *url* which will be an endpoint where UI can
download the data. Replace the asterisk with, for example, `http://localhost:9000` and the
UI will look for a data under such URLs:
```
http://localhost:9000/api/exptree
http://localhost:9000/api/chart
```
## Data interface
To populate the UI with a data it needs to fulfill agreed format. In case of
**LINQ Analyzer API** the data is send in given format out of the box. In case of
another data endpoint it needs to fulfill following interface:
```
interface ServerTreeResponse {
    isResponseValid: boolean;
    errors: string[];
    tree?: ResponseTreeNode[];
}
interface ResponseTreeNode {
    ExpressionString: string;
    Id: number;
    ParentId?: number;
    NodeText?: string;
    Text: string;
}
```

```
interface ServerChartResponse {
    isResponseValid: boolean;
    errors: string[];
    executionTimes: number[];
    finalCounts: number[];
    initialCounts: number[];
    tablesInfo: TableInfo[];
}
interface TableInfo {
    TableName: string;
    TableCount: number;
}
```
First preview shows the response interface of
tree endpoint while the second the chart endpoint.
## Start project
First of all you need to start several *npm* commands, first of all:
```
npm install
```
If your IDE has some build in dev server installed it is enough to start command:
```
npm run dev
```
If you do not have IDE with dev server you can used dev server build in the project.
You can start it by running:
```
npm run devserver
```
Entry *index.html* file can be found in root folder under a path:
```
./preview/index.html
```
