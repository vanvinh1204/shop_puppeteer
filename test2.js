execute()

function execute() {
  findResult()
  console.log("end of execute")
}

function findResult() {
  for(var i = 0; i < 100000; i++) {
    var j = 100
  }

  console.log('before findResult')

  db.collection('hospitals').findOne({name: '医療法人神甲会隈病院'},
   function(err, result){
      console.log('inner findResult callback')
   }
  )

  console.log('after findResult')
}