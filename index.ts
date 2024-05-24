#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Bank Account interface:
interface BankAccount {
    accountNumber : number;
    balance : number;
    withdraw(amount : number): void //void aik return type h jo batate he ap k jo function h wo koi value return nahi kar raha h h sirf operation perform kar raha h
    deposit(amount : number): void
    checkBalance (): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber : number, balance : number){ // constructor aik method h jo class k object ko initilize karta he
        this.accountNumber = accountNumber;  // this keyword object ko refer karta h, current object ko represent karta h
        this.balance = balance
    }

    // Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(chalk.bold.green(`\n \t Withdrawal of $${amount} sucessful. Remaining balance: $${this.balance}\n`));
        }else {
            console.log(chalk.bold.red(`\n \t Insufficient Balance.\n`));
        }
    }

    // Credit money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;  // $1 fee charged if more than $100 is deposited
        }this.balance += amount;
        console.log(chalk.bold.green(` \n \t Deposit of $${amount} sucessful. Remaining balance: $${this.balance}\n`));
    }

    // Check balance
    checkBalance(): void {
        console.log(chalk.bold.magenta(` \n \t Current balance: ${this.balance}\n`));
    }
} 

// Customer Class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account : BankAccount;

    constructor(firstName : string, lastName : string,gender : string, age : number, mobileNumber : number, account : BankAccount,
    ){
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

// Create bank Accounts

const accounts : BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)

];

// Create Customers
const Customers : Customer[] = [
    new Customer ("Ayesha", "khan","Female", 25, 3162223334, accounts[0]),
    new Customer ("Dua", "khan","Female", 20, 3182223334, accounts[1]),
    new Customer ("Humza", "khan","Male", 35, 3452223334, accounts[2])

]

// function to interact with bank account

async function Service() { 
    console.log("\x1b[1m\x1b[36m");
    console.log("***********************************************************");
    console.log("*                      OOP MY BANK                        *");
    console.log("***********************************************************");
    console.log("\x1b[0m");
  

    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name : "accountNumber",
                type : "number",
                message : (chalk.gray("Enter your account number:"))
            }
        ]);

        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
            if(Customer){
                console.log(chalk.bold.magentaBright(` \n\t  Wellcome, ${Customer.firstName} ${Customer.lastName}! \n`));
                const answer = await inquirer.prompt([
                    {
                        name : "select",
                        type : "list",
                        message : (chalk.gray("select an operation")),
                        choices : ["Deposit", "Withdraw", "Check Balance", "Exit"]
                    }
                ]);

                switch(answer.select){
                    case "Deposit":
                        const depositAmount = await inquirer.prompt([
                            {
                                name : "amount",
                                type : "number",
                                message : (chalk.gray("Enter the amount to deposit:"))
                            }
                        ]);
                        Customer.account.deposit(depositAmount.amount);
                        break;
                        case "Withdraw":
                        const withdrawAmount = await inquirer.prompt([
                            {
                                name : "amount",
                                type : "number",
                                message : (chalk.gray("Enter the amount to Withdraw:"))
                            }
                        ]);
                        Customer.account.withdraw(withdrawAmount.amount);
                        break;
                        case "Check Balance":
                            Customer.account.checkBalance();
                            break;
                        case "Exit":
                            console.log(chalk.bold.green("\n \tExiting bank program... \n"));
                            console.log(chalk.bold.cyan("\n \t Thank you for using our bank services. Have a great day!\n"));
                            return;
                }
            }else{
                console.log(chalk.bold.red(" \n \t Invalid account number. Please try again.\n"));
            }

    } while(true)
}
Service();