function createBlog(db, payload, blockInfo, context){
  db.blog_data.insert({
    id : payload.data.id,
    author : payload.data.author,
    data : payload.data.data, //Storing blog data
    email : payload.data.email
  }).then(new_blog => {
    console.log('blog created')
  }).catch(err => {
    console.log('error while inserting data')
  })
}
