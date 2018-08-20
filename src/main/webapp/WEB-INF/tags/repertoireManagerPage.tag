<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="page" tagdir="/WEB-INF/tags" %>

<%@ attribute name="title" required="false" %>
<%@ attribute name="applicationName" required="false" %>
<%@ attribute name="currentTab" required="false" %>
<%@ attribute name="showMessages" required="false" %>

<%@ variable name-given="cp" %>
<c:set var="cp" value="${pageContext.request.contextPath}" scope="request"/>

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<link rel="icon" href="resources/images/MusicNote.png">
	<title>${title}</title>	
	<link href="resources/bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
	<link href="resources/jquery/jquery-ui.css" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="resources/jquery/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="resources/jquery/jquery-ui.js"></script>
	<script src="resources/bootstrap/bootstrap.js"></script>
	<script src="resources/handlebars/handlebars-v4.0.11.js"></script>
	
<%-- 	<script type="text/javascript" src="${fn:escapeXml(cp)}/static/js/featureFlagUtil.js?${fn:escapeXml(laf_version)}"></script> --%>
<%-- 	<script type="text/javascript" src="${fn:escapeXml(cp)}/static/js/featureFlagSystem.js?${fn:escapeXml(laf_version)}"></script>	 --%>
		
	<script id="errorsTemplate" type="text/x-handlebars-template">
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert">
				<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
			</button>
			{{#each errors}}
				<span class="glyphicon glyphicon-remove"></span> <strong>{{this}}</strong><br />
			{{/each}}
		</div>
	</script>
		
	<script id="input-error-template-div" type="text/x-handlebars-template">
		<div class="form-group has-error">
		</div>
	</script>
	
	<script id="input-error-template-label" type="text/x-handlebars-template">
		<label class="control-label {{error-class}}">{{error}}</label>
	</script>

	<script id="messagesTemplate" type="text/x-handlebars-template">
		<div class="alert alert-success">
			<button type="button" class="close" data-dismiss="alert">
				<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
			</button>
			{{#each messages}}
				<span class="glyphicon glyphicon-ok"></span> <strong>{{this}}</strong><br />
			{{/each}}
		</div>
	</script>
</head>

<body>
	<!-- Navigation -->
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
		<a class="navbar-brand" href="#">Repertoire Manager</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarColor01" aria-controls="navbarColor01"
			aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarColor01">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="${cp}/">Home<span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="${cp}/solo">Solo</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="${cp}/ensemble">Ensemble</a>
				</li>
			</ul>
		</div>
	</nav>

	<jsp:doBody/>

	<!-- Footer -->
	<div align="center">
		<br />
		<jsp:useBean id="now" class="java.util.Date" />
		<fmt:formatDate var='year' value='${now}' pattern='yyyy' />
		&copy;${fn:escapeXml(year)} Daniel Jaegers<br />
	</div>
</body>