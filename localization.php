<?php
/**
 * Localized strings for the TinyMCE popup dialog
 *
 * @return
 */
$strings =
  'tinyMCE.addI18n(
    "' . $mce_locale .'.foundation_columnsPlugin",
    {
      columns : "' . esc_js( __( 'Columns', 'foundation_columns' ) ) . '",
      column : "' . esc_js( __( 'Column', 'foundation_columns' ) ) . '",
      noColumn : "' . esc_js( __( 'No Column', 'foundation_columns' ) ) . '",
      columnsTitle : "' . esc_js( __( 'Insert Columns', 'foundation_columns' ) ) . '",
      columnsIntro : "' . esc_js( __( 'For each device width, select the number of columns you want. For the best result it is recommended that you wrap all your content in columns.', 'foundation_columns' ) ) . '",
      columnsIntro2 : "' . esc_js( __( "If you don't need one of the devices, leave it at 'No column'.", 'foundation_columns' ) ) . '",
      small  : "' . esc_js( __( 'Small', 'foundation_columns' ) ) . '",
      medium  : "' . esc_js( __( 'Medium', 'foundation_columns' ) ) . '",
      large  : "' . esc_js( __( 'Large', 'foundation_columns' ) ) . '",
      grid  : "' . esc_js( __( 'Block Grid', 'foundation_columns' ) ) . '",
      gridTitle  : "' . esc_js( __( 'Insert Block Grid', 'foundation_columns' ) ) . '",
      gridIntro  : "' . esc_js( __( 'For each device width, enter the number of items you want per row.', 'foundation_columns' ) ) . '",
    }
  );';

?>
