//import * as d3 from 'd3';

let xhr: XMLHttpRequest = new XMLHttpRequest();
let method: string = "POST";
let url: string = "http://localhost:49607/api/exptree";

xhr.open(method, url, true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = (ev)=> {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log('recieved data');
    }
};

let a = 'john rambo';
//let a = 'db.Customers.AsQueryable().Where(cus => cus.CustomerID > 5 && cus.FirstName.StartsWith("Kat")).Take(5).Select(cus => new { cus.EmailAddress })';

xhr.send(JSON.stringify(a));

d3.layout.tree().size();