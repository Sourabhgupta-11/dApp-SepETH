import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";  //helps us to create a module

export default buildModule("ChaiModule", (m) => {  //ChaiModule: module name , m:ModuleBuilder to control & describe deployment
  const chaiContract = m.contract("chai");  //m.contract("chai",["hello"]) it means pass hello to contructor of chai contract
  return { chaiContract };
});