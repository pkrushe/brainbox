import jscolor from "../widget/jscolor/jscolor"

import Filter from "./Filter"

export default shape_designer.filter.OutlineStrokeFilter = class OutlineStrokeFilter extends Filter {

  constructor() {
    super()
    this.NAME = "shape_designer.filter.OutlineStrokeFilter"
    this.colorPicker = null
  }

  insertPane(figure, $parent) {

    $parent.append('<div id="outlinestroke_filter_conainer" class="panel panel-default">' +
      ' <div class="panel-heading filter-heading" data-toggle="collapse" data-target="#outlinestroke_width_panel">' +
      '     Outline Stroke' +
      '    <span id="button_remove_OutlineStrokeFilter" class="btn btn-mini icon ion-ios-close-outline pull-right" ></span>' +
      '</div>' +

      ' <div class="panel-body collapse in" id="outlinestroke_width_panel">' +
      '   <div class="form-group">' +
      '      <div class="input-group" ></div> ' + // required to ensure the correct width of the siblings
      '       <input id="filter_outlinestroke" type="text" value="' + figure.getOutlineStroke() + '" name="filter_outlinestroke" class="form-control" />' +
      '       <div class="input-group">' +
      '          <span class="input-group-addon">#</span>' +
      '          <input id="filter_outlinestroke_color" type="text" value="" name="outlinestroke-color" class="form-control color"/>' +
      '       </div>' +
      '   </div>' +
      ' </div>' +
      '</div>')

    $("input[name='filter_outlinestroke']")
      .TouchSpin({
        min: 0,
        max: 50,
        step: 1,
        boostat: figure.getOutlineStroke(),
        maxboostedstep: 10,
        postfix: 'px'
      })
      .on("change", $.proxy(function () {
        this.setOutlineStroke(parseFloat($("input[name='filter_outlinestroke']").val()))
      }, figure))


    let picker = this.colorPicker = new jscolor.color(document.getElementById('filter_outlinestroke_color'), {})
    this.colorPicker.fromString(figure.getOutlineColor().hash())
    this.colorPicker.onImmediateChange = $.proxy(function () {
      this.setOutlineColor("#" + picker.toString())
    }, figure)

    $("#button_remove_OutlineStrokeFilter").on("click", () => {
      figure.removeFilter(this)
      figure.setOutlineStroke(0)
      $("#outlinestroke_filter_conainer").animate({"height": "0", "opacity": 0, "margin-bottom": 0}, 500, () => {
        $('#outlinestroke_filter_conainer').remove()
      })
    })
  }

  removePane() {
    if (this.colorPicker !== null) {
      this.colorPicker.hidePicker()
    }
  }

  onInstall(figure) {
    figure.setOutlineStroke(1)
    figure.setOutlineColor("#ff0000")
  }
}



