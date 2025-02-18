import mongoose from "mongoose";
import testModel from "../models/testModel.js";

export const createTest = async (req, res) => {
  try {
    const {
      testName,
      totalQuestion,
      startDuration,
      endDuration,
      testDuration,
      negativeMarking,
      testType,
      testDifficulty,
      testTopic,
    } = req.body;

    // validation for data
    if (
      !testName ||
      !totalQuestion ||
      !startDuration ||
      !endDuration ||
      !testDifficulty ||
      !testDuration ||
      !negativeMarking ||
      !testTopic ||
      !testType
    ) {
      return res.send({ error: "please fill all the field" });
    }

    //if cleared all the  validation tests creating the test
    const newtest = await new testModel({
      testName,
      totalQuestion,
      startDuration,
      endDuration,
      testDuration,
      negativeMarking,
      testType,
      testDifficulty,
      testTopic,
    }).save();

    res.status(201).send({
      success: true,
      message: "test created successfully",
      newtest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in creating test",
      error,
    });
  }
};

export const getTest = async (req, res) => {
  try {
    const { testId } = req.params;

    if (testId) {
      const test = await testModel.findById(testId);
      res.status(200).send({
        success: true,
        message: "test found",
        test,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "test not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in test controller",
      error,
    });
  }
};

export const getAllTest = async (req, res) => {
    try {
        const tests = await testModel.find({});
        res.status(200).send({
            success:true,
            message:"all tests retrieved succcessfully",
            tests
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error in test controller",
          error,
        });
    }
};

export const editTest = async (req, res) => {
  try {
    const {testId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(testId)){
      return res.status(400).send({
        success: false,
        message:"invalid testid",
      })
    }
    const updatedTest = await  testModel.findByIdAndUpdate(testId,req.body,{new:true,runvalidator:true})

    //check if the updated test exist in the database 
    if(!updatedTest){
      return res.status(404).send({
        success:false,
        message:'test not found'
      })
    }
    res.status(200).send({
      success:true,
      message:"test updated successfully",
      updatedTest
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in edittest controller",
      error,
    });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const {testId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(testId)){
      return res.status(400).send({
        success: false,
        message:"invalid testid",
      })
    }
    const deletedTest = await  testModel.findByIdAndDelete(testId)

    //check if the deleted test exist in the database 
    if(!deletedTest){
      return res.status(404).send({
        success:false,
        message:'test not found'
      })
    }
    res.status(200).send({
      success:true,
      message:"test deleted successfully",
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in edittest controller",
      error,
    });
  }
};
