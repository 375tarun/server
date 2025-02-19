import mongoose from "mongoose";
import questionModel from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const {
      testPaperId,
      questionType,
      questionText,
      options,
      correctOption,
      marks,
      negativeMarks,
    } = req.body;

    // validation checks for the feilds
    if (
      !testPaperId ||
      !questionType ||
      !questionText ||
      !options ||
      !correctOption ||
      !marks ||
      !negativeMarks
    ) {
      return res.send({ message: "please fill the required fields" });
    }

    // create the new question
    const newQuestion = await new questionModel({
      testPaperId,
      questionType,
      questionText,
      options,
      correctOption,
      marks,
      negativeMarks,
    }).save();

    res.status(201).send({
      success: true,
      message: "question created successfully",
      newQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error ini createquestion controller",
      error,
    });
  }
};

export const editQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // validation for questioId to be
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).send({
        success: false,
        message: "invalid questionid",
      });
    }

    //update the question

    const updatedQuestion = await questionModel.findByIdAndUpdate(
      questionId,
      req.body,
      { new: true, runvalidator: true }
    );

    //check for the existeance of the updatequestion in the database
    if (!updatedQuestion) {
      return res.status(404).send({
        success: false,
        message: "question not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const getAllQuestion = async (req, res) => {
  try {
    const questions = await questionModel.find({});
    res.status(200).send({
      success: true,
      message: "all tests retrieved succcessfully",
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in question controller",
      error,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // validation for questioId to be
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).send({
        success: false,
        message: "invalid questionid",
      });
    }

    //update the question

    const deletedQuestion = await questionModel.findByIdAndDelete(questionId);

    //check for the existeance of the updatequestion in the database
    if (!deletedQuestion) {
      return res.status(404).send({
        success: false,
        message: "question not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "question deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};
