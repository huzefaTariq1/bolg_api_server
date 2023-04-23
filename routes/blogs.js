const router = require("express").Router();
const upload = require("../utils/multer");

const auth=require("../middleware/authMiddleware")
const{createUser11,createBlog,getAllblogs,deleteBlog,updateBlog, getSingleBlog} =require("../controller/BlogController")

// @route     /api/blog
// @desc      creating blog
// access     private
router.post("/",upload.array("pictures"),auth,createBlog)


// @route     /api/blog
// @desc      geting all blog
// access     private
router.get("/",getAllblogs)

// @route     /api/blog/:id
// @desc      get single blog
// access     private
router.get("/:id",auth,getSingleBlog)


// @route     /api/property/:id
// @desc      delete blog
// access     private
router.delete("/delete/:id",auth,deleteBlog)

// @route     /api/property/:id
// @desc      edit blog
// access     private
router.put("/:id",upload.array("pictures"),auth,updateBlog)



module.exports = router;