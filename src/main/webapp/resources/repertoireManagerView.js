var featureFlagView = function() {
	var featureFlagContainer = null;
	var featureFlagSearchForm = null;
	var searchBankNumber = null;
	var searchGroup = null
	var searchKey = null;
	var searchBtn = null;
	var searchReset = null;
	var featureFlagAddBtn = null;
	var tableContainer = null;
	var resultsTable = null;
	var resultsTableBody = null;
	var resultRowTemplate = null;
	var noFeatureFlagsFound = null;
	var searchNumberContainer = null;
	var searchResultNumber = null;
	var addBtn = null;
	var adminRole = null;
	
	var errorsDiv = null;
	var messagesDiv = null;
	
	var searching = false;
	
	var tryAgain = 'Please, try again later.';
	var systemMessages = {
		featureFlagError : 'Error retrieving Feature Flag. ' + tryAgain,
		featureFlagAdded : 'Successfully added Feature Flag.',
		featureFlagUpdated : 'Feature Flag successfully updated.',
		featureFlagDeleted : 'Feature Flag successfully deleted.'
	};
	
	// On ready initialize settings
	jQuery(document).ready(function() {
		init();
		errorsDiv.empty();
		messagesDiv.empty();
	});
	
	// Initialize dynamic content sections
	function init() {
		featureFlagContainer = jQuery('#featureFlagContainer');
		errorsDiv = featureFlagContainer.find('#error-div');
		messagesDiv = featureFlagContainer.find('#message-div');
		featureFlagSearchForm = featureFlagContainer.find('#featureFlagSearchForm');
		searchBankNumber = featureFlagSearchForm.find('#searchBankNumber');
		searchGroup = featureFlagSearchForm.find('#searchGroup');
		searchKey = featureFlagSearchForm.find('#searchKey');
		searchBtn = featureFlagSearchForm.find('#searchBtn');
		searchResetBtn = featureFlagSearchForm.find('#searchReset');
		featureFlagAddBtn = featureFlagContainer.find('#featureFlagAddBtn');
		tableContainer = featureFlagContainer.find('#tableContainer');
		resultsTable = tableContainer.find('#resultsTable');
		resultsTableBody = tableContainer.find('#resultsTableBody');
		resultRowTemplate = Handlebars.compile(jQuery('#resultRowTemplate').html());
		noFeatureFlagsFound = featureFlagContainer.find('#no-feature-flags-found');
		searchNumberContainer = featureFlagContainer.find('#searchNumberContainer');
		searchResultNumber = featureFlagContainer.find('#searchResultNumber');
		addBtn = featureFlagContainer.find('#featureFlagAddBtn');
		adminRole = featureFlagContainer.data('admin-access');
		
		resultsTable.tablesorter({
			headers : {
				3 : {
					sorter : false
				}
			}
		});
		
		initSearchInputs();
		initAddModal();
		initDeleteModal();
		initUpdateModal();
	}
	
	// Initialize the search input fields
	function initSearchInputs() {
		featureFlagSearchForm.submit(function(e) {
			e.preventDefault();
			search();
		});
		
		searchResetBtn.click(resetFeatureFlagWebPage);
	}
	
	function initAddModal() {
		addBtn.on('click', addModal);
	}
	
	function initDeleteModal() {
		resultsTableBody.on('click', '.removeProp', deleteModal);
	}
	
	function initUpdateModal() {
		resultsTableBody.on('click', '.editProp', updateModal);
	}
	
	function resetFeatureFlagWebPage() {
		resultsTable.hidden = true;
		noFeatureFlagsFound.hide();
		errorsDiv.empty();
		messagesDiv.empty();
	}
	
	function search() {
		featureFlagContainer.find('#spinner').show();
		resultsTable.hidden = false;
		searching = true;
		toggleSearchInputs();
		errorsDiv.empty();
		messagesDiv.empty();
		
		var searchParams = {
				bankNumber : searchBankNumber.val(),
				group : searchGroup.val(),
				key : searchKey.val()
		};
		
		resultsTable.find('#resultsTableBody').empty();
		resultsTable.find('.headerSortUp').removeClass('headerSortUp');
		resultsTable.find('.headerSortDown').removeClass('headerSortDown');
		noFeatureFlagsFound.hide();
		searchNumberContainer.hide();
		tableContainer.hide();
		featureFlagSystem.search(searchParams).done(function(featureFlagData) {
			searching = false;
			var displayFeatureFlag;
			
			if(!isArray(featureFlagData.featureFlag)) {
				if(featureFlagData.featureFlag !== null) {
					displayFeatureFlag = [ featureFlagData.featureFlag ];
					searchResultNumber.text("1 Feature Flag(s) Found");
				}
			} else {
				if(featureFlagData.featureFlag.length === 0) {
					noFeatureFlagsFound.show();
					tableContainer.hide();
					return;
				}
				
				displayFeatureFlag = featureFlagData.featureFlag;
				var numFeatures = displayFeatureFlag.length;
				searchResultNumber.text(numFeatures.toString() + " Feature Flag(s) Found");
			}
			
			searchNumberContainer.show();
			resultsTableBody.append(resultRowTemplate(displayFeatureFlag));
			resultsTableBody.trigger('update');
			tableContainer.show();
		}).fail(function(jqxhr, textStatus, error){
			searching = false;
			if (jqxhr.responseText != null) {
				commonController.handleFailure(jqxhr, errorsDiv);
			} else {
				commonController.addErrors(errorsDiv, systemMessages.featureFlagError);
			}
		}).always(function(){
			featureFlagContainer.find('#spinner').hide();
			toggleSearchInputs();
		});
	}
	
	// Set disabled attribute to "disabled" or remove disabled attribute
	function toggleSearchInputs() {
		if(searching) {
			searchBtn.attr('disabled', 'disabled');
			searchResetBtn.attr('disabled', 'disabled');
			searchBankNumber.attr('disabled', 'disabled');
			searchKey.attr('disabled', 'disabled');
			searchGroup.attr('disabled', 'disabled');
		} else {
			searchBtn.removeAttr('disabled');
			searchResetBtn.removeAttr('disabled');
			searchBankNumber.removeAttr('disabled');
			searchKey.removeAttr('disabled');
			searchGroup.removeAttr('disabled');
		}
	}
	
	function addModal() {
		errorsDiv.empty();
		messagesDiv.empty();
		noFeatureFlagsFound.hide();
		featureFlagModal.showModal(null, 'Add', adminRole).done(function(featureFlagData) {
			var featureFlagRecords = [];
			featureFlagRecords.push(featureFlagData.featureFlag);
			resultsTable.find('#resultsTable').empty();
			resultsTable.hidden = false;
			resultsTableBody.empty();
			featureFlagContainer.find('#searchResultNumber').empty();
			
			searching = false;
			if (featureFlagRecords.length === 0) {
				noFeatureFlagsFound.show();
				tableContainer.hide();
				return;
			}
			
			commonController.addMessages(messagesDiv, systemMessages.featureFlagAdded);
			
			searchNumberContainer.show();
			resultsTableBody.append(resultRowTemplate(featureFlagRecords));
			resultsTable.trigger("update");
			tableContainer.show();
		});
	}
	
	function deleteModal() {
		errorsDiv.empty();
		messagesDiv.empty();
		var viewRow = jQuery(this).closest('tr');
		
		var featureFlag = {};
		
		featureFlag.bankNumber = viewRow.find('td').eq(0).text();
		featureFlag.group = viewRow.find('td').eq(1).text();
		featureFlag.key = viewRow.find('td').eq(2).text();
		featureFlag.isExact = true;
		
		featureFlagModal.showModal(featureFlag, 'Delete', adminRole).done(function(data) {
			search();
			commonController.addMessages(messagesDiv, systemMessages.featureFlagDeleted);
		}).fail(function(error) {
			commonController.addErrors(messagesDiv, error);
		});
		
	}
	
	function updateModal() {
		errorsDiv.empty();
		messagesDiv.empty();
		var viewRow = jQuery(this).closest('tr');
		var featureFlag = {};
		
		featureFlag.bankNumber = viewRow.find('td').eq(0).text();
		featureFlag.group = viewRow.find('td').eq(1).text();
		featureFlag.key = viewRow.find('td').eq(2).text();
		featureFlag.isExact = true;
		
		featureFlagModal.showModal(featureFlag, 'Edit', adminRole).done(function(data){
			search();
			commonController.addMessages(messagesDiv, systemMessages.featureFlagUpdated);
		}).fail(function(error){
			commonController.addErrors(messagesDiv, error);
		});
	}
	
	// Show error message(s) when the .fail function is called during a search
	function handleFailure(jqxhr, errorsDivId) {
		var myErrors = [];
		try {
			var errorsJSON = jQuery.parseJSON(jqxhr.responseText).errors;
			jQuery.each(errorsJSON, function(i, item) {
				myErrors.push(item.message);
			});
		} catch (e) {
			myErrors.push('Internal Error.');
		}
		addError(errorsDivId, myErrors);
	}
	
	// Execute Handlebar template to display error messages(s) in an HTML table
	function addError(messageId, errors) {
		var myErrors = [];
		if (isArray(errors)) {
			myErrors = errors;
		} else {
			myErrors = [ errors ];
		}
		featureFlagContainer.find('#' + messageId).append(errorTemplate({
			'errors' : myErrors
		}));
	}
	
	
	//show messages after a .done function is called
	function addMessages(messageId, messages) {
		var myMessages = [];
		if (isArray(messages)) {
			myMessages = messages;
		} else {
			myMessages = [ messages ];
		}
		featureFlagContainer.find('#' + messageId).append(successTemplate({
			'success-message' : myMessages
		}));
	}

	
	//Test if multiple messages exist by checking if the message object is an array
	function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	
} ();