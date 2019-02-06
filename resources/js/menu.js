const www = './resources/data/www.json';
var content = null;
var prefix = '';

function showTree(){
  initRemoteContent(www, initContent);
}

function initContent(raw_data){
  let root = document.getElementById('b');
  content = JSON.parse(raw_data);
  let pre = createNode('pre','root');
  let span = createNode('span');
  let a = createNode('a');
  a.innerHTML = 'ROOT\n';
  a.onclick = function(){showSection(span,content.ROOT,prefix);};
  span.appendChild(a);
  pre.appendChild(span);
  root.appendChild(pre);
}

function showSection(elem, data, prefix) {
  elem.getElementsByTagName('a')[0].onclick = function(){hideSection(elem,data,prefix);};
  var prev = elem;
  Object.keys(data).forEach(function(branch, index) {
    let span = createNode('span',branch);
    let a = createNode('a');
    if(index == Object.keys(data).length - 1) {
      span.innerHTML = prefix + '└── ';
      a.innerHTML = branch + '\n';
      if (typeof data[branch] === 'object') {
        a.onclick = function(){showSection(span, data[branch], prefix+'    ');};
      }
    } else {
      span.innerHTML = prefix + '├── ';
      a.innerHTML = branch + '\n';
      if (typeof data[branch] === 'object') {
        a.onclick = function() {showSection(span, data[branch], prefix+'│   ');};
      }
    }
    span.appendChild(a);
    insertAfter(span, prev);
    prev = span;
  });
}

function hideSection(elem,data,prefix) {
  elem.getElementsByTagName('a')[0].onclick = function(){showSection(elem,data,prefix);};
  Object.keys(data).forEach(function(branch) {
    if (typeof data[branch] === 'object') {
      var subsection = Object.keys(data[branch]);
      present = !!document.getElementById(subsection[0]);
      if(present === true) {
        hideSubSection(subsection, data[branch]);
      }
    }
    removeNode(branch);
  });
}

function hideSubSection(subsection, data) {
  Object.keys(subsection).forEach(function(k) {
    if (typeof data[subsection[k]] === 'object') {
      var sub2 = Object.keys(data[subsection[k]]);
      present = !!document.getElementById(sub2[0]);
      if(present === true) {
        hideSubSection(sub2, data);
      }
    }
    removeNode(subsection[k]);
  });
}
