var file=require("fs");
var read=require('readline');

var readLine =read.createInterface({
 input:file.createReadStream('csv/Indicators.csv'),
});

var output=[];
var asianCountry=["Arab World","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","Cyprus","Egypt Arab Rep.","India","Indonesia","Iran Islamic Rep.","Iraq","Israel","Japan","Jordan","Kazakhstan","Korea Dem. Rep.","Korea Rep.","Kuwait","Kyrgyz Republic","Lao PDR","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Timor-Leste","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen Rep."];
var flag=1;
var countryname,indicator,year,value;
function  proces(line)
{
 var line=line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
 if(flag==1)
 {
   countryname=line.indexOf('CountryName');
   console.log(countryname);
   indicator=line.indexOf('IndicatorName');
   year=line.indexOf('Year');
   value=line.indexOf('Value');
   flag=0;

 }
 else
 {
   if(asianCountry.includes(line[countryname]))
   {
     let obj={};
     if(line[indicator]=='"Life expectancy at birth, female (years)"'||line[indicator]=='"Life expectancy at birth, male (years)"')
     {
       let flag1=1;
       output.map(function(ele,i){
         if(ele.year==line[year])
         {

           if(line[indicator]=='"Life expectancy at birth, female (years)"'){
             ele['female_birth']+=parseFloat(line[value]);
           }
           else if(line[indicator]=='"Life expectancy at birth, male (years)"'){
             ele['male_birth']+=parseFloat(line[value]);
           }
           flag1=0;
         }

       })
       if(flag1==1)
       {
         obj={
           year:line[year]
         }
         if(line[indicator]=='"Life expectancy at birth, female (years)"'){
           obj['female_birth']=parseFloat(line[value]);
           obj['male_birth']=0;
         }
         else if(line[indicator]=='"Life expectancy at birth, male (years)"'){
           obj['male_birth']=parseFloat(line[value]);
           obj['female_birth']=0;
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
 file.writeFile('json/asianCountry_life_expectency.json',JSON.stringify(output));

});

