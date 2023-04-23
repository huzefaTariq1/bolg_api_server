const Blog = require("../model/BlogModel");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multimulter");
const fs = require("fs");
const createUser11 = async (req, res) => {
  res.send("route workings");
};


// controller function for create blog
const createBlog = async (req, res) => {
  try {
    const { blogTitle, detail } = req.body;

    let pictureFiles = [];
    pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res
        .status(400)
        .json({ success: false, message: "No picture attached!" });
    if (pictureFiles.length > 9) {
      return res
        .status(400)
        .json({ success: false, message: "cant selct more" });
    }
    //map through images and create a promise array using cloudinary upload function
    let multiplePicturePromise = pictureFiles.map((picture) =>
      cloudinary.uploader.upload(picture.path, {
        resource_type: "auto",
      })
    );

    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        messsage: "Cant Upload Size Greater than 10mb",
      });
    }

    // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    let imageResponses = await Promise.all(multiplePicturePromise);

    const filteredImageResponses = imageResponses.map(
      ({ secure_url, public_id }) => ({
        secure_url,
        public_id,
      })
    );

    console.log(filteredImageResponses);
    const [firstImageResponse, ...restImageResponses] = filteredImageResponses;
    console.log(firstImageResponse)

    const blog = new Blog({
      owner: req.user.id,
      blogTitle,
      blogMainImage: {
        public_id: filteredImageResponses.public_id,
        url: firstImageResponse.secure_url,
      },
      detail: restImageResponses.map(({ secure_url, public_id }, index) => ({
        subTitle: detail[index].subTitle, // Assign subTitle from detail array in req.body
        subImage: {
          public_id: public_id,
          url: secure_url,
        },
        subText: detail[index].subText, // Assign subText from detail array in req.body
      })),
    });

    // Save the blog object to the database
    await blog.save();

    // Send a success response
    res
      .status(201)
      .json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//controller function for getting all blogs
const getAllblogs = async (req, res) => {
  try {
    const blog = await Blog.find().populate("owner", [
      "firstname",
      "lastname",
      "phone",
      "email",
    ]);
    res.status(200)
      .json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//controller function for single blog
const getSingleBlog = async (req, res) => {
  try {
    const singleProperty = await Blog.findById(req.params.id).populate("owner", [
      "firstname",
      "lastname",
      "phone",
      "email",
    ]);
    res.status(200)
      .json({ success: true, singleProperty });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};





//controller function for delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog){
      return res.status(400).json({
        success: false,
        message: "No blog on this ID",
      });
    }
    //retrieve current image ID
    
    const ids=blog.detail

    const filterID = ids.map(obj => obj.subImage.public_id);

    
    await Promise.all(filterID.map(async (public_id) => {
      await cloudinary.uploader.destroy(public_id);
    }));


    const rmProduct = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: " blog deleted",
    })

  



    res.status(200).json({
        success: true,
       blog

    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


// controoler function for edit blog
const updateBlog=async(req,res)=>{
  try {

    const blog = await Blog.findById(req.params.id)

    if (!blog){
      return res.status(404).json({message:"no blog found"})
    }

    // making sure the logged in user matches the blog user
    if (blog && blog.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User Not Authorized" })
    }

    const { blogTitle, detail } = req.body;

    let pictureFiles = [];
    pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res
        .status(400)
        .json({ success: false, message: "No picture attached!" });
    if (pictureFiles.length > 9) {
      return res
        .status(400)
        .json({ success: false, message: "cant selct more" });
    }
    //map through images and create a promise array using cloudinary upload function
    let multiplePicturePromise = pictureFiles.map((picture) =>
      cloudinary.uploader.upload(picture.path, {
        resource_type: "auto",
      })
    );

    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        messsage: "Cant Upload Video Size Greater than 10mb",
      });
    }

    // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    let imageResponses = await Promise.all(multiplePicturePromise);

    const filteredImageResponses = imageResponses.map(
      ({ secure_url, public_id }) => ({
        secure_url,
        public_id,
      })
    );

    console.log(filteredImageResponses);
    const [firstImageResponse, ...restImageResponses] = filteredImageResponses;
    console.log(firstImageResponse)

    const data = {
      owner: req.user.id,
      blogTitle,
      blogMainImage: {
        public_id: filteredImageResponses.public_id,
        url: firstImageResponse.secure_url,
      },
      detail: restImageResponses.map(({ secure_url, public_id }, index) => ({
        subTitle: detail[index].subTitle, // Assign subTitle from detail array in req.body
        subImage: {
          public_id: public_id,
          url: secure_url,
        },
        subText: detail[index].subText, // Assign subText from detail array in req.body
      })),
    };
     


    const updatedblog = await Blog.findOneAndUpdate(req.params.id, data, { new: true })

    res.status(200).json({
        success: true,
        updatedblog
    })
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



module.exports = {
  createUser11,
  createBlog,
  getAllblogs,
  getSingleBlog,
  deleteBlog,
  updateBlog
};

// // Create a new blog object
// const blog = new Blog({
//   blogTitle,
//   blogMainImage,
//   detail
// });

// const blog = new Blog({
//     blogTitle,
//     blogMainImage: firstImageResponse.secure_url,
//     detail: restImageResponses.map(({ secure_url }) => ({
//       subTitle: '',
//       subImage: secure_url,
//       subText: ''
//     }))
//   });
