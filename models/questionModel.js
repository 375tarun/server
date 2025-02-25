import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    testPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    questionType: {
      type: String,
      enum: ["single", "multiple", "typed"],
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (val) {
          return this.questionType !== "typed"
            ? val.length >= 2 && val.length <= 4
            : true;
        },
        message: "options should be 2 or more  ",
      },
    },
    correctOption: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          if (this.questionType === "single") {
            return val.length === 1 && this.options.includes(val[0]);
          }
          if (this.questionType === "multiple") {
            return val.length > 0 && val.every((ans) => this.options.includes(ans));
          }
          if (this.questionType === "typed") {
            return val.length > 0 && val.every((ans) => typeof ans === "string");
          }
          return false;
        },
        message: "Correct answer validation failed",
      },
    },
    marks: {
      type: Number,
      required: true,
    },
    negativeMarks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
