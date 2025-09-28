const xlsx = require('xlsx')
const Expense = require("../models/Expense")


exports.addExpense = async(req,res)=>{
    const userId = req.user.id;

    try{
        const {icon,category,amount,date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date : new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense)

    } catch(err){
        res.status(500).json({message:"Server Error"});
    }
}
exports.getAllExpense = async(req,res)=>{
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date : -1}) // in descending order 
        res.json(expense)

    } catch(eror){
        res.status(500).json({message:"Server Error"});
    }
}
exports.deleteExpense = async(req,res)=>{
    const userId = req.user.id;
    
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense Deleted Successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
    
    
}
exports.downloadExpenseExcel = async(req,res)=>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date : -1});
        
        //Prepare data for excel
        const data = expense.map((item)=> ({
            Category : item.category,
            Amount : item.amount,
            Date : item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb,ws,"expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
        
    }
}