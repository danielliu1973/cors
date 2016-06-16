function download(){
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); 
    a.download = 'testtest.pdf'; 
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
  xhr.open('GET', '//localhost:6234/pdf');
  xhr.send();
}

function download1(){  
  ajax('get','//localhost:6234/pdf','data',true)
  .then(
    function(e) {
      var x = document.createElement('a');    
      x.href = window.URL.createObjectURL(e.response);
      x.style = 'visibility:hidden';
      x.download = 'testtest.pdf';
      document.body.appendChild(x);
      x.click();
      document.body.removeChild(x);

    },function(e){
      console.log(e)
    }
  );
}

function ajax (type, url, data, is_file) {
  return new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open(type, url);
    request.onreadystatechange = function (){
      if(request.readyState == 2||request.readyState == 3){
        //do nothing
      }
      else if (request.readyState == 4 && (request.status === 200 || request.status === 204) && resolve) {
        resolve(request);
      }
      else if(request.readyState == 4 && request.status == 401) {
        window.top.location = '//localhost';
      }
      else if (reject) {
        reject(request);
      }
    }
    // request.setRequestHeader("Authorization", 'token ' + Utility.get_cookie('token'));
    if((type === "post" && !is_file) || (type === 'delete' && data !== 'null') || type === 'put'){
      // request.setRequestHeader("Content-Type", "application/json");
    }

    request.onerror = function(){
      reject(Error("Network Error"));
    };

    request.send(data);
  });
}