(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Traveler=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){module.export=function Queue(){var obj={};obj.repository=[];obj.index=-1;var next=function(){if(typeof obj.repository[obj.index+1]=="undefined")return;obj.index++;if(typeof obj.repository[obj.index]=="function"){obj.repository[obj.index](next)}else if(typeof obj.repository[obj.index]=="object"&&typeof obj.repository[obj.index].handle!="undefined"&&typeof obj.repository[obj.index].condition!="undefined"){if(obj.repository[obj.index].condition()){obj.repository[obj.index].handle(next)}else{next()}}};obj.add=function(handle){obj.repository[obj.repository.length]=handle;var _index=obj.repository.length-1;return{"if":function(condition){if(condition===undefined)return false;obj.repository[_index]={handle:handle,condition:condition}}}};obj.start=function(){next()};return obj}},{}],2:[function(require,module,exports){module.export=function Route(){}},{}],3:[function(require,module,exports){var Route=require("./Route"),Queue=require("./Queue");module.export=function Traveler(){}},{"./Queue":1,"./Route":2}]},{},[3])(3)});
