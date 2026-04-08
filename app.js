let units = [];
let exps = [];
let chart;

function calcMonthly(p,t){
  if(t==="year") return p/12;
  if(t==="day") return p*30;
  return p;
}

function addUnit(){
  units.push({
    n:name.value,
    p:+price.value,
    t:type.value
  });
  render();
}

function addExp(){
  exps.push({
    n:expName.value,
    p:+expPrice.value
  });
  render();
}

function render(){

  unitsList.innerHTML = units.map(u=>`<div>${u.n} - ${u.p}</div>`).join("");
  expList.innerHTML = exps.map(e=>`<div>${e.n} - ${e.p}</div>`).join("");

  let rev = units.reduce((a,u)=>a+calcMonthly(u.p,u.t),0);
  let cost = exps.reduce((a,e)=>a+e.p,0);
  let profit = rev - cost;

  document.getElementById("rev").innerText = rev;
  document.getElementById("cost").innerText = cost;
  document.getElementById("profit").innerText = profit;

  localStorage.setItem("report", JSON.stringify({rev,cost,profit}));

  drawChart(rev,cost,profit);
}

function drawChart(rev,cost,profit){
  if(chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["إيراد","تكلفة","ربح"],
      datasets:[{data:[rev,cost,profit]}]
    }
  });
}

async function saveAll(){
  await window.saveDB({units,exps});
}
