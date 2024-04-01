import Blockly from 'blockly';
import 'blockly/python';

Blockly.Blocks['plmoves'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("Player Moves");
        this.setOutput(true, "Number");
        this.setColour(260);
        this.setTooltip("Gives the player move in a certain round");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['operations'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(new Blockly.FieldDropdown([["+", "sum"], ["−", "substraction"], ["×", "multiplication"], ["÷", "division"]]), "operator");
        this.appendValueInput("B")
            .setCheck("Number")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip("Math operations");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['opmoves'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("Opponent Moves");
        this.setOutput(true, "Number");
        this.setColour(260);
        this.setTooltip("Gives the opponent move in a certain round");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['round'] = {
    init: function () {
        this.appendEndRowInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField("round");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Number of current round");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['betray'] = {
    init: function () {
        this.appendEndRowInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField("Betray");
        this.setOutput(true, "Number");
        this.setColour(260);
        this.setTooltip("Betray move");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['rely'] = {
    init: function () {
        this.appendEndRowInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField("Rely");
        this.setOutput(true, "Number");
        this.setColour(260);
        this.setTooltip("Rely move");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['return_move'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("return");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip("return statement");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['new_boundary_function'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Boundary Function Name"), "Name");
        this.appendStatementInput("Content")
            .setCheck(null);
        this.setInputsInline(true);
        this.setColour(315);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['return'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("return");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};