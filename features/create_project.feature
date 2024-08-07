@ui
Feature: Create a new project in Pivotal Tracker
  @create_project
  Scenario: The user creates a new project
    Given The user has logged in to Pivotal Tracker
      | Username | equipoaamodulo6@gmail.com |
      | Password | AbejasAstutas5 |
    When The user creates a new project named:
      | ProjectName | TestProject |
    Then The new project should be listed on the project dashboard