const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
    let text = [];
    let search ;

    if(node.nodeType === Node.TEXT_NODE)
    {
      for(search of node.textContent.split(" "))
      {
        console.log("PRE : "+ search);

        for(let change of Object.keys(MATCH_LIST))
        {
          if(search === change+"\n" || search === change)
          {
            search = MATCH_LIST[change];

            console.log("CHA : "+ search);

            break;
          }

          console.log("NO change");
        }

        text = text + search + ' ';
        console.log("Now : "+ text);
      }

      node.textContent = text ;

    }

    for(const skip of node.childNodes)
    {
      if(skip === "script" || skip === "style")
      {
        continue;
      }
      transformTextNodes(skip);
    }


}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
