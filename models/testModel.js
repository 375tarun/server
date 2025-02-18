import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    testName:{
        type:String,
        required:true,
    },
    totalQuestion:{
        type:Number,
        required:true
    },
    startDuration:{
        type:Date,
        required:true
    },
    endDuration:{
        type: Date,
        required:true
    },
    testDuration:{
        type:Number,
        required:true
    },
    negativeMarking:{
        type:Boolean,
        required:true
    },
    testType:{
        type:String,
        enum:['Live','Mock'],
        required: true
    },
    testDifficulty:{
        type:String,
        enum:['level1','level2','level3','level4'],
        required:true
    },
    testTopic:{
        type:String,
        enum:['time and distance','work','probability','statistics','algebra','geometry'],
        required:true
    }
},{ timestamps: true })

export default mongoose.model('Test',testSchema)