var Liquid = function liquid( type, quantity, value ){
    this.type = type;
    this.vital = "thirst";
    this.quantity = quantity;
    this.value = value;
    this.canUse = true;
};

export default Liquid;
