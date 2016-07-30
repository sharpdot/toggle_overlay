<?php
/**
 * @file
 * Contains \Drupal\toggle_overlay\Form\OverlaySettingsForm.
 */

namespace Drupal\toggle_overlay\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class OverlaySettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'toggle_overlay_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $config = $this->config('toggle_overlay.pages');
    $settings = $config->get('pages');
    $settings = \Drupal::config('toggle_overlay.pages');
    $settings = $settings->get('pages');
    $settings = $settings['toggle_overlay_pages'];

    $num_pages = $form_state->get('num_pages');
    if (empty($num_pages)) {
      if (is_array($settings) && count($settings) > 0) {
        $num_pages = $form_state->set('num_pages', count($settings));
      }
      else {
        $num_pages = $form_state->set('num_pages', 1);
      }
    }

    $form['toggle_overlay_pages'] = array(
      '#type' => 'container',
      '#tree' => TRUE,
      '#prefix' => '<div id="toggle_overlay_pages">',
      '#suffix' => '</div>',
    );

    for ($i = 1; $i <= $num_pages; $i++) {
      $form['toggle_overlay_pages'][$i] = array(
        '#type' => 'fieldset',
        '#tree' => TRUE,
      );

      $form['toggle_overlay_pages'][$i]['rel_path'] = array(
        '#title' => t('Path'),
        '#type' => 'textfield',
        '#description' => t('Path relative to the root. No leading slash needed.'),
        '#size' => 45,
        '#required' => TRUE,
      );

      $form['toggle_overlay_pages'][$i]['overlay'] = array(
        '#type' => 'managed_file',
        '#title' => t('Overlay Image'),
        '#description' => t('The image to overlay for this Path'),
        '#upload_location' => 'public://toggle_overlay/',
        '#required' => TRUE,
      );

      $form['toggle_overlay_pages'][$i]['offset'] = array(
        '#type' => 'textfield',
        '#title' => t('Vertical Pixel Offset'),
        '#description' => t('Number of pixels to move the overlay down the page'),
        '#size' => 3,
      );

      if (is_array($settings) && count($settings) >= $i) {
        $form['toggle_overlay_pages'][$i]['rel_path']['#default_value'] = $settings[$i]['rel_path'];
        $form['toggle_overlay_pages'][$i]['overlay']['#default_value'] = $settings[$i]['overlay'];
        $form['toggle_overlay_pages'][$i]['offset']['#default_value'] = $settings[$i]['offset'];
      }

      if ( $i == $num_pages ) {
        $form['toggle_overlay_pages'][$i]['remove_page'] = array(
          '#type' => 'submit',
          '#name' => 'remove_page_' . $i,
          '#value' => t('Remove Page'),
          '#submit' => array('::removeOne'),
          '#ajax' => array(
            'callback' => '::addmoreCallback',
            'wrapper' => 'toggle_overlay_pages',
          ),
          '#limit_validation_errors' => array(),
        );
      }
    }

    $form['add_page'] = array(
      '#type' => 'submit',
      '#name' => 'add_page',
      '#value' => t('Add A Page'),
      '#submit' => array('::addOne'),
      '#ajax' => array(
        'callback' => '::addmoreCallback',
        'wrapper' => 'toggle_overlay_pages',
      ),
      '#limit_validation_errors' => array(),
    );

    $form_state->setCached(FALSE);

    return parent::buildForm($form, $form_state);
  }

  /**
   * Callback for both ajax-enabled buttons
   */
  public function addmoreCallback(array &$form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $num_pages = $form_state->get('num_pages');
    return $form['toggle_overlay_pages'];
  }

  public function addOne(array &$form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $num_pages = $form_state->get('num_pages');
    $add_button = $num_pages + 1;
    $form_state->set('num_pages', $add_button);
    $form_state->setRebuild();
  }

  public function removeOne(array &$form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $ids = array_keys($values['toggle_overlay_pages']);
    $row_id = $ids[0];

    $num_pages = $form_state->get('num_pages');
    $rem_button = $num_pages - 1;
    $form_state->set('num_pages', $rem_button);
    $form_state->setRebuild();
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $settings['toggle_overlay_pages'] = $values['toggle_overlay_pages'];
    $this->config('toggle_overlay.pages')
        ->set('pages', $settings)
        ->save();

    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function getEditableConfigNames() {
    return array(
      'toggle_overlay.pages'
    );
  }
}
