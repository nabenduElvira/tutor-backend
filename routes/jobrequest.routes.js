module.exports=app=>{
    const jobrequests=require('../controllers/jobrequest.controller.js');
    
    app.post("/jobrequests/add",jobrequests.create);
    app.get("/jobrequests",jobrequests.findAll);

}