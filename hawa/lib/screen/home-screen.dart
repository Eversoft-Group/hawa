import 'package:flutter/material.dart';
import 'package:hawa/components/meme-list.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: MemeList(),
        ),
    );
  }
}