let ajaxImpl=(str)=>{
    let xhttp=new XMLHttpRequest();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {   let tableBody=document.getElementById("tblBody");
            tableBody.innerHTML="";
            let responseData=this.responseText;
            let jsonObj=JSON.parse(responseData);
            jsonObj.forEach((item,index)=>{
                let row=document.createElement("tr");

                let column=document.createElement("td");
                column.innerHTML=""+(index+1);
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML=""+item.cname;

                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML="<a href='/delById?cid="  + item.cid + "'><i class='text-danger fa-solid fa-trash'></i></a>"

                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML="<a href=''><i class='text-success  fa-sharp fa-solid fa-pen-to-square'></i></a>"

                row.appendChild(column);
                tableBody.appendChild(row);
            });

        }
    };
    xhttp.open("GET","/search?sd="+str,true);
    xhttp.send();
}




let student=(stu)=>{
    let xhttp=new XMLHttpRequest();

    xhttp.onreadystatechange=function(){

        if(this.readyState==4 && this.status==200)
        {
            let tableBody=document.getElementById("tblbody");
            tableBody.innerHTML="";
            let responseData=this.responseText;
            let jsonObj=JSON.parse(responseData);
            jsonObj.forEach((item,index)=>{
                let row=document.createElement("tr");
                
                let column=document.createElement("td");
                column.innerHTML=""+(index+1);
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML=""+item.sname;
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML=""+item.email;
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML=""+item.contact;
                row.appendChild(column);
                  
                column=document.createElement("td");
                column.innerHTML=""+item.cname;
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML="<a href='/delstuid?sid=" + item.sid +"'><i class='text-danger fa-solid fa-trash'></i></a>"
                row.appendChild(column);

                column=document.createElement("td");
                column.innerHTML="<a href=''><i class='text-success  fa-sharp fa-solid fa-pen-to-square'></i></a>"
                row.appendChild(column);

                tableBody.appendChild(row);

                
            });

        }
        
    
    };

    xhttp.open("GET","/ssearch?stud="+stu,true);
    xhttp.send();

}




