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
    $pages = $settings->get('pages');
    $pages = $pages['toggle_overlay_pages'];

    for($i = 1; $i <= count($pages); $i++) {
      $fid = $pages[$i]['overlay'][0];
      $file = \Drupal\file\Entity\File::load($fid);
      $path = $file->getFileUri();
      $url = file_create_url($path);
      $pages[$i]['overlay'] = $url;
    }

    // Return JSON data
    return new JsonResponse( $pages );
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
