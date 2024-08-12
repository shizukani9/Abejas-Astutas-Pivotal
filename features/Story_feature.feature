@ui
Feature: Management of Story Type - Feature

@US2-AC02_TC1 @login @createFirstProject @deleteFirstProject
Scenario: Verify that a “Feature” type story can be created with the minimum requirements
    When I create a new story in backlog panel with following information:
        | Title     | Test01  |
        | StoryType | Feature |
    Then I should see the story with name: "Test01" in backlog panel
        And  I should see the story in backlog panel with following information:
            | Title     | Test01  |
            | StoryType | Feature |
     
@US2_AC03_TC1 @login @createFirstProject @addAMemberToProject @deleteFirstProject
Scenario: Verify that a new story of type "Feature" is created with an "Owner"
    When I create a new story in backlog panel with following information:
        | Title     | Test01        |
        | StoryType | Feature       |
        | Owners    | userMember01  |
    Then I should see the story with name: "Test01" in backlog panel
        And  I should see the story in backlog panel with following information:
            | Title     | Test01        |
            | StoryType | Feature       |
            | Owners    | userMember01  |
