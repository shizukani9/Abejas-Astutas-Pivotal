const { By } = require("selenium-webdriver");

class ProjectSettingsPage{
    deleteLink = By.css('a#delete_link');
    deleteButton = By.css('#confirm_delete');
    archiveLink = By.css('a#archive_link');
    confirmArchiveButton = By.css('input#confirm_archive');
    archivedProjectsWarning = By.css('#notice');
    projectTitleInput = By.css('input#project_name');
    projectDescriptionInput = By.css('input#project_description');
    enableTasksCheckbox = By.css('input#project_enable_tasks');
    saveButton = By.css('input.save_bar__submit');
    projectNameLabel = By.css('button .tc_header_project_name');
    errorProjectTitleLabel = By.css('.form_table .error_above_or_below');
}

module.exports = new ProjectSettingsPage();