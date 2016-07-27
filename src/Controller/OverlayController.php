<?php
/**
 * @file
 * Contains \Drupal\toggle_overlay\Controller\OverlayController.
 */

namespace Drupal\toggle_overlay\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Provides route responses for the Toggle Overlay module.
 */
class OverlayController extends ControllerBase {

  /**
   * Returns the JSON settings
   *
   * @return array
   *   A JSON array of overlay information
   */
  public function jsonSettings() {
    // Get Settings
    $settings = \Drupal::config('toggle_overlay.pages');

    $settings = array(
      array(
        'rel_path' => '',
        'overlay' => '/hello.png',
        'offset' => 1,
      ),
    );

    // Return JSON data
    return new JsonResponse( $settings );
  }

  /**
   * Returns the admin configuration
   */
  public function adminSettings() {
    //TODO
    return array(
      '#title' => 'Hello!',
      '#markup' => 'World',
    );
  }
}
