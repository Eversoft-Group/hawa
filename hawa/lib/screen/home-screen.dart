import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          child: Text(
            "Hello Second Activity",
            style: TextStyle(
              color: Colors.black,
              fontSize: 30
            ),
          ),
        ),
      ),
    );
  }
}