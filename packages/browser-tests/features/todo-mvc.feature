Feature: Todo MVC
  Scenario:
    Given I visit TodoMVC examples
    When I fill in "what needs to be done" with "Buy some cheese"
    Then I see the todo item "Buy some cheese"
