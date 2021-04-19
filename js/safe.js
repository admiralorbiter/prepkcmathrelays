open = false
busy = false
valid = false

secret = ""
common = ""

loadstate = 0

function SetContents(url){
  
  contents.src = url ? url : "cheater.png"
  if(!url){
    valid = false;
    lamp.style.animation = ""
    lamp.style.background = "#f22"
  }
}

contents.addEventListener("load",function(event){
  
  //Found safe contents, unlock safe
  
  if(loadstate == 0) return;
  
  valid = true
  checksecret = false
  lamp.style.animation = ""
  lamp.style.background = "#2f2"
  
  loadstate = 0
})

contents.addEventListener("error",function(event){
  
  if(loadstate == 0) return;
  
  //Checked for the secret and failed, check for common
  if(loadstate == 1){
    loadstate = 2
    return SetContents(common)
  }
  
  //Checked for common and failed, safe is locked
  if(loadstate == 2){
    loadstate = 0
    return SetContents()
  }
})

test.onclick = function(){
  
  if(busy || open || loadstate != 0) return;
  
  lamp.style.animation = "lamp-validation 500ms linear infinite"

  secret = "assets/"+pass.value+".JPG?raw=true"
  common = "assets/"+pass.value+".JPG?raw=true"
  
  loadstate = 1
  SetContents(secret)
  
}

handle.onclick = function(){
  
  if(open || busy || loadstate != 0) return;
  busy = true
  
  handle.style.transform = "rotate(-225deg)"
  
  if(valid){
    setTimeout(function(){
      door.style.transform = "scaleX(0)"
    },1250)
    setTimeout(function(){
      doorbehind.style.transform = "scaleX(-1)"
      
      busy = false;
      open = true;
    },2250)
  }
  else{
    setTimeout(function(){
      door.style.animation = "door-locked 500ms linear"
    },1250)
    setTimeout(function(){
      door.style.animation = "";
      handle.style.transform = "rotate(45deg)"
      
      busy = false
    },2000)
  }
  
}

doorbehind.onclick = function(){
  
  if(!open || busy) return;
  busy = true
  
  doorbehind.style.transform = "scaleX(0)"
  
  setTimeout(function(){
    door.style.transform = "scaleX(1)"
  },1000)
  setTimeout(function(){
    handle.style.transform = "rotate(45deg)"
    
    busy = false
    open = false
  },2250)
  
}

SetContents()