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
          return this.answerType !== "typed"
            ? val.length >= 2 && val.length <= 4
            : true;
        },
        message: "options should be 2 or more  ",
      },
    },
    correctOption: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (val) {
          if (this.questionType === "single") {
            return typeof val === "string" && this.options.includes(val);
          }
          if (this.questionType === "multiple") {
            return (
              Array.isArray(val) &&
              val.every((ans) => this.options.includes(ans))
            );
          }
          if (this.questionType === "typed") {
            return typeof val === "string";
          }
          return false;
        },
        message: "correct answer validation falied",
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
