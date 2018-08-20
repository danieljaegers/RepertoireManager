<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="page" tagdir="/WEB-INF/tags" %>

<%@ page language="java" session="true"%>

<page:repertoireManagerPage title="Solo Repertoire" currentTab="solo">
<%-- <script src="${fn:escapeXml(laf)}/tablesorter/jquery.tablesorter.min.js${fn:escapeXml(laf_version)}"></script> --%>
<script type="text/javascript" src="${fn:escapeXml(cp)}/resources/repertoireManagerView.js"></script>

<div id="repertoireManagerContainer" class="container">
	<br/>
	<form id="featureFlagSearchForm" accept-charset=utf-8>	
		<div>
			<div class="row">
				<div id="bankSelectContainer" class="col-md">
					<label class="informational" for="searchBankNumber">Bank</label> 					
					<select id="searchBankNumber" name="bankNumber" class="form-control">
						<option value="" selected>Search by bank...</option>
						<c:forEach var="bank" items="${banks}">
							<option value="${fn:escapeXml(bank.key)}">${fn:escapeXml(bank.key)} - ${fn:escapeXml(bank.value)}</option>
						</c:forEach>
					</select>
				</div>
				<div class="col-md">
					<label for="searchGroup">Group</label>
					<input type="text" class="form-control" id="searchGroup" name="group" placeholder="Search by group..." maxlength="8"> <br/>							
				</div>
				<div class="col-md">
					<label for="searchKey">Key</label>
					<input type="text" class="form-control" id="searchKey" name="key" placeholder="Search by key..." maxlength="256"><br/>
				</div>
			</div>
		</div>
	</form>



<%-- 	<jsp:include page="includes/featureFlagModals.jsp" /> --%>
</div>

</page:repertoireManagerPage>