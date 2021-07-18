import 'package:flutter/material.dart';
import 'package:hawa/models/meme.model.dart';
import 'package:hawa/services/meme.service.dart';
import 'package:tiktoklikescroller/tiktoklikescroller.dart';

import 'meme-card.dart';

class MemeList extends StatefulWidget {
  const MemeList({Key key}) : super(key: key);

  @override
  _MemeListState createState() => _MemeListState();
}

class _MemeListState extends State<MemeList> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getMeme(),
      builder: (context, AsyncSnapshot snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.none:
          case ConnectionState.waiting:
            return CircularProgressIndicator();
          default:
            if (snapshot.hasError) {
              print(snapshot.error);
              return Text(
                "Error loading data!",
                style: TextStyle(color: Colors.red),
              );
            } else
              return createMemeView(context, snapshot);
        }
      },
    );
  }

  Widget SingleCard(index, MemeDataModel meme) {
    return Container(child: MemeCard(meme.url));
  }

  createMemeView(BuildContext context, AsyncSnapshot snapshot) {
    MemeModel memeList = snapshot.data;
    return Container(
      child: TikTokStyleFullPageScroller(
        contentSize: memeList.data.length,
        swipeVelocityThreshold: 2000,
        animationDuration: const Duration(milliseconds: 300),
        builder: (BuildContext context, int index) {
          return SingleCard(index, memeList.data[index]);
        },
      ),
    );
  }
}
