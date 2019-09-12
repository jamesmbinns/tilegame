var Food = function food( type, quantity, value ){
    this.type = type;
    this.vital = "hunger";
    this.quantity = quantity;
    this.value = value;
    this.canUse = true;
};

export default Food;
