var file=require("fs");
var read=require('readline');

var readLine =read.createInterface({
 input:file.createReadStream('csv/Indicators.csv'),
});

var output=[];
var flag=1;
var countryname,indicator,year,value;
function  proces(line)
{
 var line=line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
 if(flag==1)
 {
   countryname=line.indexOf('CountryName');
   indicator=line.indexOf('IndicatorName');
   year=line.indexOf('Year');
   value=line.indexOf('Value');
   flag=0;

 }
 else
 {
 if(line[countryname]=='India')
   {
     let obj={};
     if(line[indicator]=='"Birth rate, crude (per 1,000 people)"'||line[indicator]=='"Death rate, crude (per 1,000 people)"')
     {
       let flag1=1;
       output.map(function(ele,i){
         if(ele.year==line[year])
         {

           if(line[indicator]=='"Birth rate, crude (per 1,000 people)"'){
             ele['Birth_rate']+=parseFloat(line[value]);
           }
           else if(line[indicator]=='"Death rate, crude (per 1,000 people)"'){
             ele['Death_rate']+=parseFloat(line[value]);
           }
           flag1=0;
         }

       })
       if(flag1==1)
       {
         obj={
           year:line[year]
        
         if(line[indicator]=='"Birth rate, crude (per 1,000 people)"'){
           obj['Birth_rate']=parseFloat(line[value]);
           obj['Death_rate']=0;
         }
         else if(line[indicator]=='"Death rate, crude (per 1,000 people)"'){
           obj['Death_rate']=parseFloat(line[value]);
           obj['Birth_rate']=0;
         }
         output.push(obj)
       }
     }

   }
 }

}

readLine.on('line', function (line) {

 proces(line);

// console.log(arr);

}).on('close',function(){
 console.log(output);
 file.writeFile('json/india_birth_death_rate.json',JSON.stringify(output));

});